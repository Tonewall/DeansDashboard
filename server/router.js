// Modules for Microsoft sql server connection.
const sql = require("mssql");
var config = require('./db_config')
const read = require('read')
const { exec } = require('child_process')
const sprintf = require('sprintf-js').sprintf;


// Contains methods for generating common query.
const query_factory = require("./query_factory");

// Ensure mutual exclusive operation on sql server.
//  * every query must have a timeout to avoid deadlock
const { Mutex } = require('async-mutex');
const db_mutex = new Mutex();

// Common api for querying
function db_query(query_string, next) {
    db_mutex.acquire().then((release) => {
        const conn = new sql.ConnectionPool(config)
        conn.connect().then((conn) => {
            conn.query(query_string).then((result) => {
                /* Below comment is duplicate of result preprocessing code in DirectQuery.js.  
                 * Thinking of a way to get that preprocessing done within the router */
                /*
                var data = result.recordset.
                data.forEach(element => {
                    Object.keys(element).forEach(key => {
                        if(element[key] == null)    element[key]='-'
                        else if(element[key] == true) element[key]='true'
                        else if(element[key] == false)    element[key]='false'
                    });
                });*/
                next(null, result.recordset);
                release();
            }).catch(error => {
                next(error, null);
                release();
            });
        }).catch(error => {
            next(error, null);
            release();
        });
    });
}

// Router
function add_router(app) {
    /* For now, pulls data from fake table, but will from [Incident Offenses-GTPD+APD] table */
    app.get('/showall', function (req, res) {
        queryString = query_factory.showall();
        db_query(queryString, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });

    /* Direct querying for debugging purpose */
    app.post('/direct-query', function (req, res) {
        console.log(req.body['query'])
        db_query(req.body['query'], (err, result) => {
            if (!err) res.send(JSON.stringify(result));
            else res.status(400).send([err]);
        });
    });

    /* Gets location data */
    app.get('/locations', function (req, res) {
        db_query(query_factory.locations, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });

    app.post('/filter', function (req, res) {
        criteria_script = ''
        additional_join_statement = ''

        codes_address_unique_join = false

        
        /* Location Filter
            - Priority: Street Name -> Buildings -> Loc Type
         */
        if(req.body.streetName != null) // Street Name
        {
            criteria_script += '('
            criteria_script += sprintf('[Incident Offenses-GTPD+APD].[Street Name] like \'%%%s%%\'', req.body.streetName)
            criteria_script += (req.body.selectedDepartment.value == 'bothDepartment') ? '' :
                    (req.body.selectedDepartment.value == 'gtpDepartment') ? ' AND LEN([OCA Number]) = 8' :
                                                                             ' AND LEN([OCA Number]) = 9'
            criteria_script += ')'
        }
        
        // This maybe inefficient, but can reuse code
        else
        {
            gtpd_criteria_script = ''
            apd_criteria_script = ''

            // Make GTPD part
            if(req.body.selectedBuilding != null && req.body.selectedBuilding.length > 0)   // GTPD-Building
            {
                building_list_script = ''
                req.body.selectedBuilding.forEach((item)=>{ building_list_script += ('\'' + item['Building Name'] + '\'' + ',') })
                building_list_script = building_list_script.substring(0, building_list_script.length-1)
                gtpd_criteria_script = '([Location Landmark] in (' + building_list_script + ') AND LEN([OCA Number]) = 8)'
            }
            else if(req.body.selectedGTLocationType.value == 'Any') // GTPD-Any loc type : all GTPD buildings
            {
                gtpd_criteria_script = '(LEN([OCA Number]) = 8)'
            }
            else    // GTPD-Loc Type(Specific)
            {
                codes_address_unique_join = true
                gtpd_criteria_script = '([Loc Type] = \'' + req.body.selectedGTLocationType.value + '\' AND LEN([OCA Number]) = 8)'
            }

            // Make APD part
            if(req.body.selectedAPDBuilding != null && req.body.selectedAPDBuilding.length > 0)   // APD-Building
            {
                building_list_script = ''
                req.body.selectedAPDBuilding.forEach((item)=>{ building_list_script += ('\'' + item['Building Name'] + '\'' + ',') })
                building_list_script = building_list_script.substring(0, building_list_script.length-1)
                apd_criteria_script = '([Location Landmark] in (' + building_list_script + ') AND LEN([OCA Number]) = 9)'
            }
            else if(req.body.selectedAPDLocationType.value == 'Any') // APD-Any loc type : all APD buildings
            {
                apd_criteria_script = '(LEN([OCA Number]) = 9)'
            }
            else    // APD-Loc Type(Specific)
            {
                codes_address_unique_join = true
                apd_criteria_script = '([Loc Type] = \'' + req.body.selectedAPDLocationType.value + '\' AND LEN([OCA Number]) = 9)'
            }

            // Integrate into one according to the department state
            if(req.body.selectedDepartment.value == 'bothDepartment')   // Both departments
            {
                criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + '(' + gtpd_criteria_script + ' OR ' + apd_criteria_script + ')'
            }
            else if(req.body.selectedDepartment.value == 'gtpDepartment')   // GTPD department
            {
                criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + gtpd_criteria_script
            }
            else    // APD department
            {
                criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + apd_criteria_script
            }
        }

        /* Crime Filter */
        // TODO!

        /* Personnel Filter */
        // TODO!

        /* Date Filter */
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') 
                + '(' + '[Report Date] >= \'' + req.body.startDate + '\' AND [Report Date] <= \'' + req.body.endDate + '\')'

        if(codes_address_unique_join)
            additional_join_statement += 
                'LEFT JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\
                    AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name]) '

        queryString = query_factory.filter(additional_join_statement.length==0 ? null : additional_join_statement, criteria_script.length==0 ? null : criteria_script);
        
        db_query(queryString, (err, result) => {
            if (!err) res.send(result);
            else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/crimeTypes', function (req, res) {
        db_query(query_factory.crimeTypes, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });
    app.get('/crimeCategories', function (req, res) {
        db_query(query_factory.crimeCategories, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });
    app.post('/getBothCount', function (req, res) {
        query = query_factory.getBothCount(req.body)
        db_query(query, (err, result) => {
            if (!err) {
                if (result[0] != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });
    app.post('/getTimeCount', function (req, res) {
        query = query_factory.getTimeCount(req.body)
        db_query(query, (err, result) => {
            if (!err) {
                if (result[0] != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });
    app.get('/getYears', function (req, res) {
        db_query(query_factory.getYears, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });

    app.post('/getLocationRanking', function (req, res) {
        query = query_factory.getLocationRanking(req.body)
        db_query(query, (err, result) => {
            if (!err) {
                if (result[0] != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    
    /*
        Integrates basic_info with offense_desc, narratives, offender_info, arrest_info, property_info
        Usage example: 
            - Basic info: incident_info['Case Disposition'], incident_info['OCA Number']
            - Offense Description: incident_info['Offense Description'] (array)
            - Narratives: incident_info['Narratives'] (array)
            - Offender Information: incident_info['Offender Info'] (array)
            - Arrest Information: incident_info['Arrest Info'] (array)
            - Property Information: incident_info['Property Info'] (array)
    */
    app.get('/incident-number-integrated/:incident_number', function(req, res)
    {
        (async ()=> 
        {
            // resolve basic info
            basic_info_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_incident_basic(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result[0] != null)
                            res(result[0]);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info = await basic_info_resolver.catch(err=>res.status(400).send(err))
            if(incident_info == null)   return

            // resolve MO
            MO_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_MO(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['MO'] = await MO_resolver.catch(err=>console.log('Couldn\'t retrieve MO, but will not throw an error.'))
            
            // resolve offense_desc
            offense_desc_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_offense_description(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['Offense Description'] = await offense_desc_resolver.catch(err=>console.log('Couldn\'t retrieve offense description, but will not throw an error.'))
            
            // resolve narratives
            narratives_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_narratives(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['Narratives'] = await narratives_resolver.catch(err=>console.log('Couldn\'t retrieve narratives, but will not throw an error.'))

            // resolve offender_info
            offender_info_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_offender_info(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['Offender Info'] = await offender_info_resolver.catch(err=>console.log('Couldn\'t retrieve offender information, but will not throw an error.'))

            // resolve arrest_info
            arrest_info_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_arrest_info(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['Arrest Info'] = await arrest_info_resolver.catch(err=>console.log('Couldn\'t retrieve arrest information, but will not throw an error.'))

            // resolve property_info
            property_info_resolver = new Promise(async (res, rej) => {
                query = query_factory.get_property(req.params.incident_number)
                db_query(query, (err, result) => {
                    if (!err) {
                        if (result != null)
                            res(result);
                        else
                            rej('No data found');
                    }
                    else rej(err);
                });
            });
            incident_info['Property Info'] = await property_info_resolver.catch(err=>console.log('Couldn\'t retrieve property information, but will not throw an error.'))

            res.send(incident_info);
        })();
    });

    app.get('/incident-number-basic/:incident_number', function (req, res) {
        query = query_factory.get_incident_basic(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result[0] != null)
                    res.send(result[0]);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/MO/:incident_number', function (req, res) {
        query = query_factory.get_MO(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/offense-description/:incident_number', function (req, res) {
        query = query_factory.get_offense_description(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/narrative_APD/:incident_number', function (req, res) {
        query = query_factory.get_narrative_APD(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null && result[0] != null)
                {
                    res.send(result[0]);
                }
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/narrative/:incident_number', function (req, res) {
        query = query_factory.get_narrative(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null && result[0] != null)
                {
                    res.send(result[0]);
                }
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/supplements/:incident_number', function (req, res) {
        query = query_factory.get_supplements(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/offender-info/:incident_number', function (req, res) {
        query = query_factory.get_offender_info(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/arrest-info/:incident_number', function (req, res) {
        query = query_factory.get_arrest_info(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/property-info/:incident_number', function (req, res) {
        query = query_factory.get_property(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                    res.send(result);
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });
}


/* Gets username and password from stdin.
 * Passes to callback (configured connection, null) if configuration succeeded, or (null, error reason) otherwise. */
config_db = async (next) => {
    var error_reason = null;
    var conn;

    username_resolver = new Promise(async (res, err) => {
        read({ prompt: 'GT username: ' }, (err, result, def) => {
            res(result)
        })
    })
    username = await username_resolver

    password_resolver = new Promise(async (res, err) => {
        read({ prompt: 'Password: ', silent: true, replace: '*' }, (err, result, def) => {
            res(result)
        })
    })
    password = await password_resolver

    config.user = username;
    config.password = password;

    db_connector = new Promise(async (res, err) => {
        conn = new sql.ConnectionPool(config)
        conn.connect().then((conn) => {
            res(true)
        }).catch(error => {
            error_reason = error
            res(false)
        })
    })
    success = await db_connector

    if (!success) conn = null;

    next(conn, error_reason);
};

module.exports = function (app) {
    // Use recursion to repeatedly retry database configuration attmpt.
    db_connection_check = () => {
        config_db((conn, error_reason) => {
            if (conn) {
                console.log('\x1b[34m', "[Server] Database configuration successful!\n");
                add_router(app);
                console.log('\x1b[0m', "[Server] Now attaching router...\n")
                console.log('[Server] Router successfully attached.\n');
                console.log("[Client] Now starting the client");
                client = exec('npm run client')
                client.stdout.on('data', (data) => { console.log('[Client] : ' + data) });
            }
            else {
                console.log('\x1b[31m', "[Server] Database configuration failed!\n" + error_reason + '\n');
                console.log('\x1b[0m', "[Server] Retrying database configuration\n")
                db_connection_check()
            }
        })
    }

    // Validate username and password. Then, attach router
    db_connection_check()
}