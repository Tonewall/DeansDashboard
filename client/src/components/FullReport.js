import React, { Component } from "react";
import './FullReport.css';
import Incident from './FullReportComponents/Incident'
import IncidentLocation from './FullReportComponents/IncidentLocation'
import IncidentTime from './FullReportComponents/IncidentTime'
import Complainant from './FullReportComponents/Complainant'
import Victim from './FullReportComponents/Victim'

class fullReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            incidentNumber: null,
        }
    }

    

    componentDidMount() {
        this.setState({incidentNumber: this.props.match.params.incidentNumber})
    }

    getCaseNumber() {
        if(this.state.incidentNumber != null) {
            return (
                <div>
                    <div className="col-12">Case #: {this.state.incidentNumber} </div>                
                </div>
            )
        }
    }


    render() {
        return(
        <div className="main mainFullReport">
            <div className="card fullReportCard">
            <h2 className="card-header caseCardHeader">Incident Report </h2>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <b>Agency ID (ORI): GA0601000</b>
                        </div>
                        <div className="col-6">
                            <b>{this.getCaseNumber()}</b>
                        </div>
                    </div>
                    <Incident incidentNumber={this.props.match.params.incidentNumber}/>
                    <IncidentLocation incidentNumber={this.props.match.params.incidentNumber}/>
                    <IncidentTime incidentNumber={this.props.match.params.incidentNumber}/>
                    <Complainant incidentNumber={this.props.match.params.incidentNumber}/>
                    <Victim incidentNumber={this.props.match.params.incidentNumber}/>
                </div>
            </div>
        </div>
        )
    }
}
export default fullReport;