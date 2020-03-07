import React, { Component } from "react";
import './Filter.css';
import Select from "react-select";
import Date from "./FilterComponents/Date"


const reportTypeOptions = [
    {value: 'All', label: 'All'},
    {value: 'Approved', label: 'Approved'},
    {value: 'Unapproved', label: 'Unapproved'},
    {value: 'Juvenile', label: 'Juvenile'},
];

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            selectedReportType:{value: 'All', label: 'All'}
        };
        this.dateHandler = this.dateHandler.bind(this)
        this.setReportType = this.setReportType.bind(this)
    }

    dateHandler = (date) => {
        this.setState({
            endDate: date.endDate, 
            startDate: date.startDate
        })
    }
    setReportType = selectedReportType => {
        this.setState({selectedReportType});
    }

    handleSubmit = () => {
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
export default Filter;