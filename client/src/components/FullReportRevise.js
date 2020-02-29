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
        console.log(incidentNumber)
        fetch('/incident-number-basic/'+incidentNumber)
            .then(results => {
                results.json().then(data=> {
                    console.log(data)
                    this.setState({case: data})
                    getDetails()
                })
            })
            .catch(err => console.error(err))
    }

    getReport() {
        console.log(this.state)
        if(this.state.case != null) {
            //getting Time
           return(
               <div className="full_report_main">
                   <div className="row">
                        <div className="col-1"></div>
                        <div className="topFullReport col-2"><b>Case Disposition:</b> {this.state.case['Case Disposition']}</div>
                        <div className="topFullReport col-2"><b>Team/Unit: </b> {this.state.case['Unit']}</div>
                        <div className="topFullReport col-2"><b>Officer: </b> {this.state.case['Officer Name']}</div>
                        <div className="topFullReport col-2"><b>VClear: </b> {this.state.case['VClear'] != null && this.state.case['VClear'].toString()}</div>
                        <div className="topFullReport col-2"><b>Video: </b> {this.state.case['Video'] != null && this.state.case['Video'].toString()}</div>
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
            <h2 className="card-header caseCardHeader">INCIDENT REPORT {this.getTitle()}</h2>
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