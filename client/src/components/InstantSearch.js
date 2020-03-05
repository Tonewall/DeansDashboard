import React, { Component } from "react";
import './Filter.css';
import IncidentNumber from "./FilterComponents/IncidentNumber"


class InstantSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            incidentNumber: null
        };
        this.incidentNumberHandler = this.incidentNumberHandler.bind(this)
    }
    incidentNumberHandler = (incidentNumber) => {
        this.setState({incidentNumber: incidentNumber.incidentNumber})
    }
    handleSubmit = () => {
        this.props.submitHandler(this.state)
    }
    render() {
        return(
            <div className="main filterCardMain">
                <div className="card filterCard">
                    <h2 className="card-header">Instant Search</h2>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <IncidentNumber incidentNumberHandler={this.incidentNumberHandler}/>
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
export default InstantSearch;