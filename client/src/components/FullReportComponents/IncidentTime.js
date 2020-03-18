import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config.js'

class IncidentTime extends Component {
    state = {
        incidentNumber: null,
        data: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
    }
    getIncidentData() {
        fetch(server+'/getIncidentBasic/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({data: data})
                    })
                })
                .catch(err => console.error(err))
    }
    getDateTimeFormat(date, time) {
        var formattedDate = ""
        var formattedTime = ""
        if(date) {
            formattedDate = this.state.data[0].IncidentFromDate.toString().substring(0,10)
        }
        if(time) {
            var fromTime = new Date(time)
            var hours = fromTime.getHours();
            var minutes = fromTime.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            formattedTime = hours + ':' + minutes + ampm;
        }
        var fromDateTime = formattedDate + " " + formattedTime
        return fromDateTime

    }

    getIncidentFromDate() {
        if(this.state.data && this.state.data[0]){
            var fromDateTime = this.getDateTimeFormat(this.state.data[0].IncidentFromDate, this.state.data[0].IncidentFromTime)
            return(
                <div>
                    <input readOnly value={" " + fromDateTime} style={{ width: "100%" }}/>
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
    getIncidentToDate() {
        if(this.state.data && this.state.data[0]){
            var toDateTime = this.getDateTimeFormat(this.state.data[0].IncidentToDate, this.state.data[0].IncidentToTime)
            return(
                <div>
                    <input readOnly value={" " + toDateTime} style={{ width: "100%" }}/>
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
                    <div className='col-2'>
                        <label>From Date/Time</label>
                        
                    </div>
                    <div className='col-2'>
                        <label>To Date/Time</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-2'>
                        {this.getIncidentFromDate()}
                        
                    </div>
                    <div className='col-2'>
                        {this.getIncidentToDate()}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default IncidentTime;
