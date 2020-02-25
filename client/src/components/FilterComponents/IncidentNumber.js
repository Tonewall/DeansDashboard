import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


class date extends Component {
    state = {
        incidentNumber: null,
    };

    constructor(props) {
        super(props)
        props.incidentNumberHandler(this.state)
    }

    handleLoginChange(typed) {
        this.setState({incidentNumber: typed},
            function() {
                this.props.incidentNumberHandler(this.state)
            })
    }

    render() {
        return(
            <div className="main">
                <label>Incident Number</label>
                <input type="text" className="form-control" onChange={e => this.handleLoginChange(e.target.value)}placeholder="Incident Number"/>
            </div>
        )
    }
}
export default date;

