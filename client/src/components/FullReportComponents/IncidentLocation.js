import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


class IncidentLocation extends Component {
    state = {
        incidentNumber: null,
        location: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber})
    }

    getLocation() {
        if(true){
            return(
                <div>
                    <input readOnly value={" Student Health Center - 740 Ferst Drive NW"} style={{ width: "100%" }}/>
                </div>
            )
        }
        
    }
    getLocationCode() {
        if(true){
            return(
                <div>
                    <input readOnly value={" ONCAM"} style={{ width: "100%" }}/>
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
