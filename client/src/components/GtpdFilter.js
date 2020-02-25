import React, { Component } from "react";
import './GtpdFilter.css';
import Date from "./FilterComponents/Date"
import IncidentNumber from "./FilterComponents/IncidentNumber"

class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            incidentNumber: null,
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
        console.log(incidentNumber)
        this.setState({incidentNumber: incidentNumber})
    }

    handleSubmit = () => {
        this.props.submitHandler(this.state)
    }

    render() {
        return(
            <div className="main filterCardMain">
                <div className="card filterCard">
                    <h2 className="card-header">Filter</h2>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <IncidentNumber incidentNumberHandler={this.incidentNumberHandler}/>
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