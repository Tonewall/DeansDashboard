import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


class Victim extends Component {
    state = {
        incidentNumber: null,
        victim: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/getVictim/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({victim: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getVictimName() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={" "+ ((victim.FirstName === null) ? "" : victim.FirstName) + " " + ((victim.LastName === null) ? "" : victim.LastName)} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }

    }
    getRace() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={(victim.Race === null) ? "" : " "+ victim.Race} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getAge() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={(victim.Age === null) ? "" : " "+ victim.Age} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getSex() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={(victim.Sex === null) ? "" : " "+ victim.Sex} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getResidencePhone() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={(victim.Phone === null) ? "" : " "+ victim.Phone} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getWorkPhone() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={(victim.WorkPhone === null) ? "" : " "+ victim.WorkPhone} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }

    

    render() {
        return(
            <div className='row'>
                <div className='col-3'>
                    <label>Victim's Name</label>
                    {this.getVictimName()}
                </div>
                <div className='col-1'>
                    <label>Race</label>
                    {this.getRace()}
                </div>
                <div className='col-1'>
                    <label>Age</label>
                    {this.getAge()}
                </div>
                <div className='col-1'>
                    <label>Sex</label>
                    {this.getSex()}
                </div>
                <div className='col-3'>
                    <label>Residence Phone</label>
                    {this.getResidencePhone()}
                </div>
                <div className='col-3'>
                    <label>Business Phone</label>
                    {this.getWorkPhone()}
                </div>
            </div>
            
        )
    }
}

export default Victim;
