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
            permission_check_running: true,
            permission_denied: true,
            report_class: '',
            incidentNumber: null,
        }
    }

    componentDidMount() {
        this.setState({incidentNumber: this.props.match.params.incidentNumber})
        fetch('/check_permission/'+this.props.match.params.incidentNumber)
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                    if(data.length===0)
                    {
                        this.setState({permission_check_running: false, permission_denied: true, report_class: 'unfound'});
                    }
                    if(data[0]['Approved Date']==null)
                    {
                        this.setState({permission_check_running: false, permission_denied: true, report_class: 'unapproved'});
                    }
                    // eslint-disable-next-line 
                    else if(data[0]['Juvenile']==1)
                    {
                        this.setState({permission_check_running: false, permission_denied: true, report_class: 'juvenile'});
                    }
                    else
                    {
                        this.setState({permission_check_running: false, permission_denied: false});
                    }
            })})
            .catch(err => console.error(err))
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
            this.state.permission_check_running ? 
                /*<div style={{display: 'flex', lineHeight:'20px', fontSize:'20px', padding: '30px'}}>
                    <div style={{paddingRight:'10px', fontWeight: 'bold'}}>Checking permission...</div>
                    <div className="fas fa-spinner fa-spin" style={{color: '#777',height:'20px', fontSize:'20px'}}></div>
                </div> */
                <div></div>
                : 
                (
                    this.state.permission_denied ?
                        <div style={{display: 'flex', lineHeight:'20px', fontSize:'20px', padding: '30px'}}>
                            <div className="fas fa-exclamation" style={{paddingRight:'20px', color: '#700',height:'20px', fontSize:'20px'}}></div>
                            <div style={{fontWeight: 'bold'}}>Cannot access {this.state.report_class} report.</div>
                        </div>
                        : 
                        <div className="main mainFullReport">
                            <div className="card fullReportCard">
                            <h2 className="card-header caseCardHeader">Incident Report</h2>
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
        )
    }
}
export default fullReport;