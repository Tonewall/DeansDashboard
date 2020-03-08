import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


class IncidentLocation extends Component {
    state = {
        incidentNumber: null,
        location: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentLocation();
            })
    }
    getIncidentLocation() {
        fetch('/getIncidentBasic/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({location: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getLocation() {
        if(this.state.location && this.state.location[0]){
            return(
                <div>
                    <input readOnly value={" " + this.state.location[0].Location} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return (
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }
        
    }
    getLocationCode() {
        if(this.state.location && this.state.location[0]){
            return(
                <div>
                    <input readOnly value={" " + this.state.location[0].LocationCode} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return (
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    render() {
        return(
            <div>
                <div className="row">
                    <div className='col-8'>
                        <label>Incident Location</label>
                        {this.getLocation()}
                        
                    </div>
                    <div className='col-4'>
                        <label>Location Code</label>
                        {this.getLocationCode()}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default IncidentLocation;
