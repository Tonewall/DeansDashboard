const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.showall = function(criteria=null, max_num_reports=-1) {
    return 'SELECT distinct ' + ((max_num_reports==-1) ? '':sprintf('top (%d)', max_num_reports)) +
            ' [ARPLandingNew].[OCA] as [Case]\n\
            , CONVERT(varchar, [ARPLandingNew].[DateReported], 23) as [Report Date]\n\
            , CONVERT(varchar, [ARPLandingNew].[DateApproved], 23) as [Approved Date]\n\
            , [ARPLandingNew].[StatusDescription] as [Status]\n\
            , [ARPLandingNew].[Description]\n\
            , [ARPLandingNew].[Location]\n\
            , [ARPLandingNew].[Juvenile]\n\
        FROM [SS_GARecords_Incident].[dbo].[ARPLandingNew]\n'+
        (criteria==null ? '' : ('WHERE ' + criteria + '\n'))+
        'ORDER BY [Case] DESC';
}

/* Queries for filters */
module.exports.filter = function(criteria) {

    criteria_script = ''

    /* Date Filter */
    criteria_script = '([DateReported] >= \'' + criteria.startDate + '\' AND [DateReported] <= \'' + criteria.endDate + '\')'

    /* Report Type Filter */
    switch(criteria.selectedReportType.value) {
        case "All":
            // DO NOTHING
            break;
        case "Approved":
            criteria_script += 'AND ([ARPLandingNew].[DateApproved] is not null)'
            break;
        case "Unapproved":
            criteria_script += 'AND ([ARPLandingNew].[DateApproved] is null)'
            break;
        case "Juvenile":
            criteria_script += 'AND ([ARPLandingNew].[Juvenile] = \'1\')'
            break;
        default:
            console.log("invalid report type");
    }

    return this.showall(criteria = criteria_script.length==0 ? null : criteria_script)
}


/* Queries for instant search for specific incident number*/
module.exports.search = function(incident_number) {

    criteria_script = '[ARPLandingNew].[OCA] like \'%' + incident_number + '%\''

    return this.showall(criteria = criteria_script)
}

module.exports.check_permission = function(incident_number) {
    return sprintf('\
        SELECT distinct \n\
        CONVERT(varchar, [ARPLandingNew].[DateApproved], 23) as [Approved Date]\n\
        , [ARPLandingNew].[Juvenile]\n\
        FROM [SS_GARecords_Incident].[dbo].[ARPLandingNew]\n'
        + sprintf('WHERE [ARPLandingNew].[OCA] = \'%s\'', incident_number))
}

module.exports.getIncidentData = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
        ,[SupplementNumber]\
        ,[OffenseCode]\
        ,[AttemptComplete]\
        ,[OffenseDescription]\
        ,[Counts]\
        ,[OffenseType]\
        ,[Statute]\
        ,[OCANumber]\
        ,[Degree]\
        FROM [SS_GARecords_Incident].[dbo].[ARPOffense]\
        WHERE ([OCANumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}
module.exports.getIncidentBasic = function(incident_number) {
    return sprintf('\
        SELECT [OCA]\
        ,[LastUpdatedDate]\
        ,[DateReported]\
        ,[TimeReported]\
        ,[IncidentToDate]\
        ,[IncidentToTime]\
        ,[IncidentFromDate]\
        ,[IncidentFromTime]\
        ,[CaseStatus]\
        ,[CaseDisposition]\
        ,[ReportingOfficerName]\
        ,[ReportingOfficerID]\
        ,[ClearanceDate]\
        ,[ClearingOfficerID]\
        ,[ClearingOfficerName]\
        ,[LocationCode]\
        ,[Location]\
        ,[IncidentType]\
        ,[CaseManagementStatus]\
        ,[Narrative]\
        ,[GCIC]\
        ,[DrugRelated]\
        ,[Juvenile]\
        ,[ApprovingOfficerID]\
    FROM [SS_GARecords_Incident].[dbo].[ARPIncidentNew]\
    WHERE ([OCA]=\'%s\')\n\
    ', incident_number)
}
module.exports.getComplainant = function(incident_number) {
    return sprintf('\
        SELECT [OCA]\
        ,[PersonType]\
        ,[FirstName]\
        ,[LastName]\
        ,[DOB]\
        ,[Age]\
        ,[Race]\
        ,[Sex]\
        ,[HomeAddress]\
        ,[City]\
        ,[State]\
        ,[Zip]\
        ,[Phone]\
        ,[SequenceNumber]\
    FROM [SS_GARecords_Incident].[dbo].[ARPComplainant]\
    WHERE ([OCA]=\'%s\')\n\
    ', incident_number)
}
module.exports.getVictim = function(incident_number) {
    return sprintf('\
        SELECT [OCA]\
        ,[SequenceNumber]\
        ,[VictimType]\
        ,[Age]\
        ,[Race]\
        ,[Sex]\
        ,[FirstName]\
        ,[MiddleName]\
        ,[LastName]\
        ,[DOB]\
        ,[HomeAddress]\
        ,[City]\
        ,[State]\
        ,[ZIP]\
        ,[Student]\
        ,[CensusTract]\
        ,[VictimSchool]\
        ,[Phone]\
        ,[WorkPhone]\
        ,[Employer]\
        ,[Occupation]\
    FROM [SS_GARecords_Incident].[dbo].[ARPVictim]\
    WHERE ([OCA]=\'%s\')\n\
    ', incident_number)
}