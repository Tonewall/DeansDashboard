const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.showall = function(criteria=null) {
    return sprintf('\
        SELECT distinct [tblIncident].[IncidentNumber] as [Incident Number]\n') +
        '\
            , CONVERT(varchar, [ReportDate], 23) as [Report Date]\
            , CONCAT([LocationStreetNumber], \' \', [LocationStreet]) as [Street]\
            , [LocationLandmark] as [Location Name]\
            , [CaseStatus] as [Case Status]\
            , [OffenseDescription] as [Description]\
            , CONVERT(varchar, [DateApproved], 23) as [DateApproved]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\
            ON ( [tblIncident].[IncidentNumber] = [tblIncidentOffense].[IncidentNumber] )\
                Where LEN([tblIncident].[IncidentNumber]) = 8 \n' +
        (criteria==null ? '' : ('AND ' + criteria + '\n'))+
        'ORDER BY [Report Date] DESC';
}
// LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
// ON ( [tblIncidentOffender].[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number] )\
//            , [Description]\



module.exports.get_incident_basic = function(incident_number) {
    return sprintf('\
        SELECT [OCA Number]\
            , [Case Disposition]\
            , [Unit]\
            , [Officer Name]\
            , [Report Date]\
            , [From Date]\
            , [From Time]\
            , [To Date]\
            , [To Time]\
            , [Avg Date]\
            , [Avg Time]\
            , [DTEdit]\
            , [Shift]\
            , [Video]\
            , [VClear]\
            , [LType]\
            , [Location Code]\
            , [Patrol Zone]\
            , [Location Landmark]\
            , [Address]\
            , [Intersection]\
            , [Apt-Rm-Ste]\
            , [Alcohol]\
            , [Drug]\
            , [Weapon]\
            , [Offense]\
            , [NIBRSOffense]\
            , [Premises]\
            , [Offn From]\
            , [UCR Changed]\
            , [PType]\
            , [UCInc+]\
            , [CSR]\
            , [Clery]\
            , [Clery+]\
            , [CSArr]\
            , [8399]\
            , [CSRef]\
            , [CSDVS]\
            , [GTtype]\
            , [GTstatus]\
            , [EMS]\
            , [Injured]\
            , [Suicide]\
            , [1013]\
            , [RO]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD] left join [CrimeAnalytics].[dbo].[Times] on ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
        WHERE ([OCA Number]=\'%\s\')\
    ', incident_number)
}


module.exports.get_incident_basic_other = function(incident_number) {
    return sprintf('\
        SELECT [OCA Number]\
            , [AssignedToUnit]\
            , [ReportingOfficerName]\
            , [Report Date]\
            , [From Date]\
            , [From Time]\
            , [To Date]\
            , [To Time]\
            , [Avg Date]\
            , [Avg Time]\
            , [DTEdit]\
            , [Shift]\
            , [Video]\
            , [VClear]\
            , [LType]\
            , [Location Code]\
            , [Patrol Zone]\
            , [Location Landmark]\
            , [Address]\
            , [Intersection]\
            , [Apt-Rm-Ste]\
            , [Alcohol]\
            , [Drug]\
            , [Weapon]\
            , [Offense]\
            , [NIBRSOffense]\
            , [Premises]\
            , [Offn From]\
            , [UCR Changed]\
            , [PType]\
            , [UCInc+]\
            , [CSR]\
            , [Clery]\
            , [Clery+]\
            , [CSArr]\
            , [8399]\
            , [CSRef]\
            , [CSDVS]\
            , [GTtype]\
            , [GTstatus]\
            , [EMS]\
            , [Injured]\
            , [Suicide]\
            , [1013]\
            , [RO]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident] \
        left join [SS_GARecords_Incident].[dbo].[tblIncidentDrug] on ([tblIncident].[IncidentNumber] = [tblIncidentDrug].[IncidentNumber])\
        left join [SS_GARecords_Incident].[dbo].[tblIncidentAssignment] on ([tblIncident].[IncidentNumber] = [tblIncidentAssignment].[IncidentNumber])\n\
        WHERE ([OCA Number]=\'%\s\')\
    ', incident_number)
}

module.exports.get_MO = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [MO]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
        ', incident_number)
}

module.exports.get_offense_description = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [OffenseCode]\
            , [AttemptComplete]\
            , [OffenseDescription]\
            , [Counts]\
            , [Statute]\
            , [OffenseType]     /* Felony or Misdemeanor */\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_narrative_GTPD = function(incident_number) {
    return sprintf('\
        SELECT [Narrative]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
    ', incident_number)
}

module.exports.get_supplements = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [DateEntered]\
            , [OfficerName]\
            , [Narrative] as Text\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentSupplement]\n\
        WHERE ([IncidentNumber]=\'%s\' and [Narrative] is not null)\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_offender_info = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , CONCAT([LastName], \', \', [FirstName], \' \', [MiddleName]) AS OffenderName\
            , [Race]\
            , [Sex]\
            , [DateOfBirth]\
            , [Age]\
            , [Juvenile]\
            , [Wanted]\
            , [DriverLicenseNumber]\
            , [Height]\
            , [Weight]\
            , [HairColor]\
            , [HomeAddress]\
            , [HomeCity]\
            , [Warrant]\
            , [Arrest]\
            , [SSN]\
            , [Occupation]\
            , [Employer]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_arrest_info = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , CONCAT([LastName], \', \', [FirstName], \' \', [MiddleName]) AS OffenderName\
            , [Race]\
            , [Sex]\
            , [ArrestAddress]\
            , [ArrestDate]\
            , [ArrestTime]\
            , [DateOfBirth]\
            , [Age]\
            , [Height]\
            , [Weight]\
            , [HomeAddress]\
            , [HomeCity]\
            , [ArrestingOfficerName] AS ArrestOfficer\
            , [DateOfOffense] AS OffenseDate\
            , [Juvenile]\
            , [HairColor]\
            , [DriverLicenseNumber]\
            , [SSN]\
            , [DrugUse]\
            , [Occupation]\
            , [Employer]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentArrest]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_property = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [Description] AS PropertyType\
            , [Status]\
            , [ItemDescription]\
            , [Make]\
            , [Model]\
            , [VehicleYear]\
            , [VehicleType]\
            , [VehicleStyle]\
            , [LicensePlateState]\
            , [LicensePlateNumber]\
            , [ItemValue]\
            , [Recovered]\
            , [ObtainedAddress]\
            , [ObtainedCity]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] left join [SS_GARecords_Config].[dbo].[tblLkpIBRProperty] \
                on ([tblIncidentProperty].[TypeCode] = [tblLkpIBRProperty].[Code])\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}
 
/* Queries for filters */
module.exports.filter = function(criteria) {

    criteria_script = ''

    /* Date Filter */
    criteria_script = '([ReportDate] >= \'' + criteria.startDate + '\' AND [ReportDate] <= \'' + criteria.endDate + '\')'
    if(criteria.incidentNumber){
        criteria_script += 'AND [tblIncident].[IncidentNumber] = \'' + criteria.incidentNumber + '\''
    }
    return this.showall(criteria = criteria_script.length==0 ? null : criteria_script)
}