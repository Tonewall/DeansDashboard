import React, { Component } from "react";
import './GtpdFilter.css';
import Select from "react-select";
import Date from "./FilterComponents/Date"
import IncidentNumber from "./FilterComponents/IncidentNumber"


const reportTypeOptions = [
    {value: 'Normal', label: 'Normal'},
    {value: 'Approved', label: 'Approved'},
    {value: 'Unapproved', label: 'Unapproved'},
    {value: 'Juvenile', label: 'Juvenile'},
];

class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            incidentNumber: null,
            selectedReportType:{value: 'Normal', label: 'Normal'},
        };
        this.dateHandler = this.dateHandler.bind(this)
        this.incidentNumberHandler = this.incidentNumberHandler.bind(this)
    }

    dateHandler = (date) => {
        this.setState({
            endDate: date.endDate, 
            startDate: date.startDate
        })
    }
    incidentNumberHandler = (incidentNumber) => {
        this.setState({incidentNumber: incidentNumber.incidentNumber})
    }
    setReportType = selectedReportType => {
        this.setState({selectedReportType});
    }

    handleSubmit = () => {
        console.log(this.state)
        this.props.submitHandler(this.state)
    }

    render() {
        const { selectedReportType } = this.state;
        return(
            <div className="main filterCardMain">
                <div className="card filterCard">
                    <h2 className="card-header">Filter</h2>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <IncidentNumber incidentNumberHandler={this.incidentNumberHandler}/>
                                <label>
                                    Report Type
                                </label>
                                <Select 
                                value={selectedReportType} 
                                onChange={this.setReportType} 
                                options={reportTypeOptions} 
                                placeholder={"Custom"}
                                />
                                <Date dateHandler={this.dateHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="searchButton">
                                    <button onClick={this.handleSubmit} className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default gtpdFilter;