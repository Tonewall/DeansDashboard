import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

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
        fetch(server+'/getIncidentBasic/'+this.state.incidentNumber, {credentials: 'include'})
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
                        <label>Location</label>
                        {this.getLocation()}
                        
                    </div>
                    <div className='col-4'>
                        <label>Code</label>
                        {this.getLocationCode()}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default IncidentLocation;
