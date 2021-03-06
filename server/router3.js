// Modules for Microsoft sql server connection.
const sql = require("mssql");
var config = require('./db_config')
const read = require('read')
const { exec } = require('child_process')
const https = require('https')
const parseString = require('xml2js').parseString;
var fs = require('fs');

var authorized_users;

update_authorized_users = ()=>
{
	// Make verified user list
	authorized_users = fs.readFileSync('./AuthorizedUsers').toString().split("\n");
	authorized_users = authorized_users.map((str)=>str.trim())
	console.log('authorized users:')
	console.log(authorized_users)
}

update_authorized_users()
setInterval(update_authorized_users, 300000);	// Update authorized users list every 5mins

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

    var session_checker = function (req, res, next) {
      if(req.originalUrl=='/verify_user'||req.originalUrl=='/validate_ticket')
      {
        // if it's user verifyting or ticket validating, pass.
        next()
      }
      else
      {
        var sess = req.session
        if(!sess.authorized)
        {
          // if it's db access but the user is not authorized, deny.
          res.send('Not authorized.')
        }
        else
        {
          // good to go.
          next();
        }
      }
    }
      
    app.use(session_checker)

    app.get('/verify_user', function(req, res) {
      var sess = req.session
      if(sess.authorized)
      {
        res.json({authorized: true, logged_in: true}) 
      }
      else if(!sess.username)
      {
        // no log in info in the session
        res.json({authorized: false, logged_in: false})
      }
      else
      {
        // user logged in. check authrization
        if(authorized_users.indexOf(sess.username)!=-1)
        {
          // one of authorized users
          sess.authorized = true;
          res.json({authorized: true, logged_in: true})
        }
        else
        {
          // one of authorized users
          res.json({authorized: false, logged_in: true})
        }
        
      }
    })


    app.post('/validate_ticket', function(req, res) {
	console.log(req.body.ticket)
        var sess=req.session
        serviceValidate = 'https://aaa.login.gatech.edu/cas/serviceValidate?service='+req.body.service+'&ticket='+req.body.ticket;
	console.log(serviceValidate)
        https.get(serviceValidate, function(validateResponse){
          var body = '';
          validateResponse.on('data', function(chunk) {
            body += chunk;
          });
          validateResponse.on('end', function(){
            //handling the response
            parseString(body, function (err, result) {
	      console.dir(result)
              if(result !== undefined && result['cas:serviceResponse'] !== undefined)
              {
                if(result['cas:serviceResponse']['cas:authenticationSuccess'] !== undefined)
                {
                  var successResult = result['cas:serviceResponse']['cas:authenticationSuccess'];
		  console.log(successResult)
                  sess.username = successResult[0]['cas:user'][0];
                  res.json({success: true});
                }
                else
                {
                  //Login Failed Try Again: May cause infinite browser redirect loop
                  res.json({success: false});
                }
              }
              else
              {
                res.json({success: false});
              }
            });
          });
        }).on('error', function(e) {
          res.send('HTTP Validation error');
        });


    })







/*
    app.post('/validate_ticket', function(req, res) {
        var sess=req.session
        serviceValidate = 'https://login.gatech.edu/cas/serviceValidate?service='+req.body.service+'&ticket='+req.body.ticket;

        https.get(serviceValidate, function(validateResponse){
          var body = '';
          validateResponse.on('data', function(chunk) {
            body += chunk;
          });
          validateResponse.on('end', function(){
            //handling the response
            parseString(body, function (err, result) {
              if(result !== undefined && result['cas:serviceResponse'] !== undefined)
              {
                if(result['cas:serviceResponse']['cas:authenticationSuccess'] !== undefined)
                {
                  var sucessResult = result['cas:serviceResponse']['cas:authenticationSuccess'];
                  sess.username = sucessResult[0]['cas:user'][0];
                  res.json({success: true});
                }
                else
                {
                  //Login Failed Try Again: May cause infinite browser redirect loop
                  res.json({success: false});
                }
              }
              else
              {
                res.json({success: false});
              }
            });
          });
        }).on('error', function(e) {
          res.send('HTTP Validation error');
        });


    })
*/
    app.get('/showall', function (req, res) {
        queryString = query_factory.showall();
        db_query(queryString, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });

    app.post('/filter', function (req, res) {
        queryString = query_factory.filter(req.body)

        db_query(queryString, (err, result) => {
            if (!err) res.send(result);
            else res.status(400).send(err);
        });
    });

    app.get('/search/:incident_number', function(req, res) {
        queryString = query_factory.search(req.params.incident_number);
        db_query(queryString, (err, result) => {
            if (!err) res.send(result);
            else 
            {
                console.log(err)
                res.status(400).send(err);
            }
        });
    });
    
    app.get('/check_permission/:incident_number', function(req, res) {
        query = query_factory.check_permission(req.params.incident_number)
        db_query(query, (err, result) => {
            if (!err) {
                if (result != null)
                {
                    res.send(result);
                }
                else
                    res.status(400).send('No data found');
            }
            else res.status(400).send(err);
        });
    });

    app.get('/getIncidentData/:incident_number', function (req, res) {
        query = query_factory.getIncidentData(req.params.incident_number)
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
    app.get('/getIncidentBasic/:incident_number', function (req, res) {
        query = query_factory.getIncidentBasic(req.params.incident_number)
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
    app.get('/getComplainant/:incident_number', function (req, res) {
        query = query_factory.getComplainant(req.params.incident_number)
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
    app.get('/getVictim/:incident_number', function (req, res) {
        query = query_factory.getVictim(req.params.incident_number)
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
    app.get('/getOffender/:incident_number', function (req, res) {
        query = query_factory.getOffender(req.params.incident_number)
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
    app.get('/getProperty/:incident_number', function (req, res) {
        query = query_factory.getProperty(req.params.incident_number)
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



    app.get('/getNarrative/:incident_number', function (req, res) {
        query = query_factory.get_narrative(req.params.incident_number)
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
    
    app.get('/getSupplements/:incident_number', function (req, res) {
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
}


/* Gets username and password from stdin.
 * Passes to callback (configured connection, null) if configuration succeeded, or (null, error reason) otherwise. */
config_db = async (next) => {
    var error_reason = null;
    var conn;

    if(process.argv[2] && process.argv[2]=='--deploy')
	{
		username = process.argv[3]
		password = process.argv[4]
	}
	else
    {
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
    }
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
                if(!process.argv[2] || !(process.argv[2]=='--server-only'||process.argv[2]=='--deploy'))
                {
                    console.log("[Client] Now starting the client");
                    client = exec('npm run client')
                    client.stdout.on('data', (data) => { console.log('[Client] : ' + data) });
                }
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
