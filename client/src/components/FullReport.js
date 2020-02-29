import React, { Component } from "react";
import './FullReport.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class fullReport extends Component {

    state = {
        case: null,
        offenseDescription: null,
        narrative: null,
        supplements: null,
        offenderInfo: null,
        arrestInfo: null,
        propertyInfo: null,
        MO: null,
    }
    

    componentDidMount() {
        var {incidentNumber} = this.props.match.params;
        this.populateReport(incidentNumber);
    }

    populateReport(incidentNumber) {
        var getDetails = ()=>{
            fetch('/offense-description/'+incidentNumber)
                .then(results => {
                    results.json().then(data=> {
                        this.setState({offenseDescription: data})
                    })
                })
                .catch(err => console.error(err))
            

                fetch('/narrative_GTPD/'+incidentNumber)
                    .then(results => {
                        if(!results.ok) {
                            results.text().then(txt=>console.log(txt))
                            this.setState({narrative: 'No narrative'})
                            return
                        }
                        results.json().then(data => {
                            this.setState({narrative: data['Narrative']})
                        })
                    })
                    .catch(err => console.error(err))
            fetch('/supplements/'+incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({supplements: data})
                    })
                })
                .catch(err => console.error(err))
            fetch('/offender-info/'+incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({offenderInfo: data})
                    })
                })
                .catch(err => console.error(err))
            fetch('/arrest-info/'+incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({arrestInfo: data})
                    })
                })
                .catch(err => console.error(err))
            fetch('/property-info/'+incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({propertyInfo: data})
                    })
                })
                .catch(err => console.error(err))
            fetch('/MO/'+incidentNumber)
                .then(results => {
                    results.json().then(data=> {
                        this.setState({MO: data})
                    })
                })
                .catch(err => console.error(err))
            }

        fetch('/incident-number-basic/'+incidentNumber)
            .then(results => {
                results.json().then(data=> {
                    this.setState({case: data})
                    getDetails()
                })
            })
            .catch(err => console.error(err))
    }

    getReport() {
        if(this.state.case != null) {
            //getting Time
            var fromTime = new Date(this.state.case['From Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            var toTime = new Date(this.state.case['To Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            var avgTime = new Date(this.state.case['Avg Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return (
                <div className="full_report_main">
                    <div className="row topReport">
                        <div className="col-1"></div>
                        <div className="topFullReport col-2"><b>Case Disposition:</b> {this.state.case['Case Disposition']}</div>
                        <div className="topFullReport col-2"><b>Team/Unit: </b> {this.state.case['Unit']}</div>
                        <div className="topFullReport col-2"><b>Officer: </b> {this.state.case['Officer Name']}</div>
                        <div className="topFullReport col-2"><b>VClear: </b> {this.state.case['VClear'] != null && this.state.case['VClear'].toString()}</div>
                        <div className="topFullReport col-2"><b>Video: </b> {this.state.case['Video'] != null && this.state.case['Video'].toString()}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-3"><b>GT Type: </b>{this.state.case['GTtype']}</div>
                        <div className="topFullReport col-3"><b>EMS: </b>{this.state.case['EMS']}</div>
                        <div className="topFullReport col-3"><b>Suicide: </b>{this.state.case['Suicide']}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-3"><b>GT Status: </b>{this.state.case['GTstatus']}</div>
                        <div className="topFullReport col-3"><b>Injured: </b>{this.state.case['Injured']}</div>
                        <div className="topFullReport col-3"><b>1013: </b>{this.state.case['1013']}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-3"><b>Clery: </b>{this.state.case['Clery']}</div>
                        <div className="topFullReport col-3"><b>CSArr: </b>{this.state.case['CSArr']}</div>
                        <div className="topFullReport col-3"><b>CSRef: </b>{this.state.case['CSRef']}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-3"><b>Clery+: </b>{this.state.case['Clery+']}</div>
                        <div className="topFullReport col-3"><b>8399: </b>{this.state.case['8399']}</div>
                        <div className="topFullReport col-3"><b>CSDVS: </b>{this.state.case['CSDVS']}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-3"><b>Repeat Offender: </b>{this.state.case['RO'] != null && this.state.case['RO'].toString()}</div>
                    </div>
                    <div className="row whenRow">
                        <div className="whenCard card col-10">
                            <div className="row">
                                <div className="whenTitle col-2">When</div>
                                <div className="when col-10"><b>Occurred Shift: </b>{this.state.case['Shift']}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="when col-3"><b>Report Date: </b>{ this.state.case['Report Date'] && this.state.case['Report Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>From Date: </b>{ this.state.case['From Date'] && this.state.case['From Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>To Date: </b>{ this.state.case['To Date'] && this.state.case['To Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>Avg Date: </b>{ this.state.case['Avg Date'] && this.state.case['Avg Date'].substring(0,10) }</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><b>Date Edit: </b>{ this.state.case['DTEdit'] && this.state.case['DTEdit'].toString() }</div>
                                <div className="when col-3"><b>From Time: </b>{fromTime}</div>
                                <div className="when col-3"><b>To Time: </b>{toTime}</div>
                                <div className="when col-3"><b>Avg Time: </b>{avgTime}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row whereRow">
                        <div className="whereCard card col-10">
                            <div className="row">
                                <div className="whereTitle col-2">Where</div>
                                <div className="where col-10"><b>Landmark: </b>{(this.state.case['Location Landmark'])}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="where col-4"><b>Location Type: </b>{this.state.case['LType']}</div>
                                <div className="where col-4"><b>Location Code: </b>{this.state.case['Location Code']}</div>
                                <div className="where col-4"><b>Zone: </b>{this.state.case['Patrol Zone']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Street: </b>{this.state.case['Address']}</div>
                                <div className="where col-4"><b>Apt-Rm-Suite: </b>{this.state.case['Apt-Rm-Ste']}</div>
                                <div className="where col-4"><b>Intersection: </b>{(this.state.case['Intersection'])}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offenseCard card col-10">
                            <div className="row">
                                <div className="whatTitle col-3">What (Offense):</div>
                                <div className="col-3"><b>Alcohol: </b>{this.state.case['Video'] != null && this.state.case['Alcohol'].toString()}</div>
                                <div className="col-3"><b>Drug: </b>{this.state.case['VClear'] != null && this.state.case['Drug'].toString()}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="where col-4"><b>Old Offense: </b>{this.state.case['Offense']}</div>
                                <div className="where col-4"><b>NIBRS Offense: </b>{this.state.case['NIBRSOffense']}</div>
                                <div className="where col-4"><b># Premises: </b>{this.state.case['Premises']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Offense From: </b>{this.state.case['Offn From']}</div>
                                <div className="where col-4"><b>UCR Changed: </b>{this.state.case['UCR Changed']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Prop. Type: </b>{this.state.case['PType']}</div>
                                <div className="where col-4"><b>Weapon: </b>{this.state.case['Weapon']}</div>
                                <div className="where col-4"><b>UCInc+: </b>{this.state.case['UCInc+']}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offenseDescCard card col-10">
                            <h2 className="card-header">Offense Description</h2>
                            {this.getOffenseDescription()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="narrativeCard card col-10">
                            <div className="row">
                                <div className="narrativeTitle col-12">Narrative</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="where col-12">{this.state.narrative}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="supplementCard card col-10">
                            <h2 className="card-header">Supplement</h2>
                            {this.getSupplements()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="propertyCard card col-10">
                            <h2 className="card-header">Property</h2>
                                {this.getProperty()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="offenderCard card col-10">
                            <h2 className="card-header">Offender Information</h2>
                                {this.getOffender()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="arrestCard card col-10">
                            <h2 className="card-header">Arrest Info</h2>
                                {this.getArrest()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="arrestCard card col-10">
                            <h2 className="card-header">M.O. Characteristics</h2>
                                {this.getMO()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="loading">
                    Report Not Found
                </div>
            )
        }
    };

    getTitle() {
        if(this.state.case != null) {
            return (
                <div>
                    <div className="col-12">Case #: {this.state.case['OCA Number']} </div>                
                </div>
            )
        }
    }
    getOffenseDescription() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var offenseDesc = this.state.offenseDescription
        var result = [];
        if(this.state.offenseDescription != null) {
            for(var i = 0; i < offenseDesc.length; i++) {
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-4"><b>OCA #: </b>{this.state.case['OCA Number']}</div>
                                <div className="where col-4"><b>Seq #: </b>{offenseDesc[i]['SequenceNumber']}</div>
                                <div className="where col-4"><b>Offense Code: </b>{offenseDesc[i]['OffenseCode']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Attempt Complete: </b>{offenseDesc[i]['AttemptComplete']}</div>
                                <div className="where col-4"><b>Counts: </b>{offenseDesc[i]['Counts']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-12"><b>Offense Description: </b>{offenseDesc[i]['OffenseDescription']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Statute: </b>{offenseDesc[i]['Statute']}</div>
                                <div className="where col-4"><b>Misdemeanor - Felony: </b>{offenseDesc[i]['OffenseType']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }
    getNarrative() {
        return (
            <div className="offenseDescriptionElement">
                <div className="offenseDescriptionCard">
                    <div className="where col-12">
                        {this.state.narrative}
                    </div>
                </div>
            </div>
        )
    }
    getSupplements() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var supplements = this.state.supplements
        var result = [];
        if(this.state.supplements != null) {
            for(var i = 0; i < supplements.length; i++) {
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-4"><b>Case #: </b>{this.state.case['OCA Number']}</div>
                                <div className="where col-4"><b>Date Entered: </b>{supplements[i]['DateEntered'] && supplements[i]['DateEntered'].substring(0,10)}</div>
                                <div className="where col-4"><b>Officer Name: </b>{supplements[i]['OfficerName']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-12"><b>Text: </b>{supplements[i]['Text']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }
    getProperty() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var property = this.state.propertyInfo
        var result = [];
        if(this.state.propertyInfo != null) {
            for(var i = 0; i < property.length; i++) {
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-3"><b>Case #: </b>{this.state.case['OCA Number']}</div>
                                <div className="where col-3"><b>Seq #: </b>{property[i]['SequenceNumber']}</div>
                                <div className="where col-3"><b>Type Code: </b>{}</div>
                                <div className="where col-3"><b>Seq #: </b>{property[i]['Status']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Vehicle Make: </b>{this.state.case['Make']}</div>
                                <div className="where col-3"><b>Vehicle Model: </b>{property[i]['Model']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Vehicle Year: </b>{property[i]['VehicleYear']}</div>
                                <div className="where col-3"><b>Vehicle Type: </b>{property[i]['VehicleType']}</div>
                                <div className="where col-3"><b>Vehicle Style: </b>{property[i]['VehicleStyle']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Item Value: </b>${property[i]['ItemValue']}</div>
                                <div className="where col-3"><b>Recovered: </b>{property[i]['Recovered'] != null && property[i]['Recovered'].toString()}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>License Plate #: </b>{property[i]['LicensePlateNumber']}</div>
                                <div className="where col-3"><b>License Plate State: </b>{property[i]['LicensePlateState']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-6"><b>Obtained Address: </b>{property[i]['ObtainedAddress']}</div>
                                <div className="where col-3"><b>Obtained City: </b>{property[i]['ObtainedCity']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-12"><b>Item Description: </b>{property[i]['ItemDescription']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }
    getOffender() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var offender = this.state.offenderInfo
        var result = [];
        if(this.state.offenderInfo != null) {
            for(var i = 0; i < offender.length; i++) {
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-3"><b>Arrest: </b>{offender[i]['Arrest'] != null && offender[i]['Arrest'].toString()}</div>
                                <div className="where col-3"><b>Warrant: </b>{offender[i]['Warrant'] != null && offender[i]['Warrant'].toString()}</div>
                                <div className="where col-3"><b>Wanted: </b>{offender[i]['Wanted'] != null && offender[i]['Wanted'].toString()}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Name: </b>{offender[i]['OffenderName']}</div>
                                <div className="where col-3"><b>Age: </b>{offender[i]['Age']}</div>
                                <div className="where col-3"><b>Date of Birth: </b>{offender[i]['DateOfBirth'] && offender[i]['DateOfBirth'].substring(0,10)}</div>
                                <div className="where col-3"><b>Sex: </b>{offender[i]['Sex']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Height: </b>{offender[i]['Height']}</div>
                                <div className="where col-3"><b>Weight: </b>{offender[i]['Weight']}</div>
                                <div className="where col-3"><b>Hair Color: </b>{offender[i]['HairColor']}</div>
                                <div className="where col-3"><b>Race: </b>{offender[i]['Race']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-6"><b>Home Address: </b>{offender[i]['HomeAddress']}</div>
                                <div className="where col-3"><b>Home City: </b>{offender[i]['HomeCity']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-6"><b>Driver License #: </b>{offender[i]['DriverLicenseNumber']}</div>
                                <div className="where col-6"><b>SSN: </b>{offender[i]['SSN']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-6"><b>Employer: </b>{offender[i]['Employer']}</div>
                                <div className="where col-3"><b>Juvenile: </b>{offender[i]['Juvenile'] != null && offender[i]['Juvenile'].toString()}</div>
                                <div className="where col-3"><b>Occupation: </b>{offender[i]['Occupation']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }
    getArrest() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var arrest = this.state.arrestInfo
        var result = [];
        if(this.state.arrestInfo != null) {
            for(var i = 0; i < arrest.length; i++) {
                var arrestTime = new Date(arrest[i]['ArrestTime']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-3"><b>Arrest Date: </b>{arrest[i]['ArrestDate'] && arrest[i]['ArrestDate'].substring(0,10)}</div>
                                <div className="where col-3"><b>Arrest Officer: </b>{arrest[i]['ArrestOfficer']}</div>
                                <div className="where col-3"><b>Arrest Time: </b>{arrestTime}</div>
                                <div className="where col-3"><b>Arrest Address: </b>{arrest[i]['ArrestAddress']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Offense Date: </b>{arrest[i]['OffenseDate'] && arrest[i]['OffenseDate'].substring(0,10)}</div>
                                <div className="where col-3"><b>Drug Use: </b>{arrest[i]['DrugUse']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Offender Name: </b>{arrest[i]['OffenderName']}</div>
                                <div className="where col-3"><b>Age: </b>{arrest[i]['Age']}</div>
                                <div className="where col-3"><b>Date of Birth: </b>{arrest[i]['DateOfBirth'] && arrest[i]['DateOfBirth'].substring(0,10)}</div>
                                <div className="where col-3"><b>Sex: </b>{arrest[i]['Sex']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Hair Color: </b>{arrest[i]['HairColor']}</div>
                                <div className="where col-3"><b>Height: </b>{arrest[i]['Height']}</div>
                                <div className="where col-3"><b>Weight: </b>{arrest[i]['Weight']}</div>
                                <div className="where col-3"><b>Race: </b>{arrest[i]['Race']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-6"><b>Home Address: </b>{arrest[i]['HomeAddress']}</div>
                                <div className="where col-3"><b>Home City: </b>{arrest[i]['HomeCity']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>Juvenile: </b>{arrest[i]['Juvenile'] != null && arrest[i]['Juvenile'].toString()}</div>
                                <div className="where col-3"><b>Occupation: </b>{arrest[i]['Occupation']}</div>
                                <div className="where col-3"><b>Employer: </b>{arrest[i]['Employer']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-3"><b>SSN: </b>{arrest[i]['SSN']}</div>
                                <div className="where col-3"><b>Driver License Number: </b>{arrest[i]['DriverLicenseNumber']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }

    getMO() {
        var style = {
            backgroundColor: "#dddddd",
            textAlign: "left"
        }
        var mo = this.state.MO
        var result = [];
        if(this.state.MO != null) {
            for(var i = 0; i < mo.length; i++) {
                result.push(
                    <div className="offenseDescriptionElement" key={i}>
                        <div className="offenseDescriptionElementCard"style={style}>
                            <div className="row">
                                <div className="where col-12">{mo[i]['MO']}</div>
                            </div>
                        </div>
                        <img alt=""></img>
                    </div>
                );
            }
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
    }

    render() {
        return(
        <div className="main mainFullReport">
            <div className="card fullReportCard">
            <h2 className="card-header caseCardHeader">{this.getTitle()}</h2>
                <div className="card-body">
                    <div className="fullReportInfo">
                        {this.getReport()}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default fullReport;