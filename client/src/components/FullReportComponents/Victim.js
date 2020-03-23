import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

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
        fetch(server+'/getVictim/'+this.state.incidentNumber, {credentials: 'include'})
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
    getAddress() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={" "+(victim.HomeAddress?victim.HomeAddress+(victim.City?", "+victim.City+(victim.State?", "+victim.State:""):""):"")} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getStudent() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
            <input className="row" type="checkbox" key={index} checked={victim.Student && victim.Student=='Y'} disabled/>
            ) 
            return victims
        } else {return(<input className="row" type="checkbox" checked={false} disabled/>)}
    }
    getJob() {
        if(this.state.victim){
            var victims = this.state.victim.map((victim, index) =>
                <input readOnly key={index} value={" "+(victim.Employer?victim.Employer:"")+" "+(victim.Occupation?victim.Occupation:"")} style={{ width: "100%" }}/>
            ) 
            return victims
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='labelContainer col-3'>
                        <label>Victim's Name</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Race</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Age</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Sex</label>
                    </div>
                    <div className='labelContainer col-3'>
                        <label>Residence Phone</label>
                    </div>
                    <div className='labelContainer col-3'>
                        <label>Business Phone</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        {this.getVictimName()}
                    </div>
                    <div className='col-1'>
                        {this.getRace()}
                    </div>
                    <div className='col-1'>
                        {this.getAge()}
                    </div>
                    <div className='col-1'>
                        {this.getSex()}
                    </div>
                    <div className='col-3'>
                        {this.getResidencePhone()}
                    </div>
                    <div className='col-3'>
                        {this.getWorkPhone()}
                    </div>
                </div>
                <div className='unitGap'></div>
                <div className="row">
                    <div className='labelContainer col-6'>
                        <label>Address</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Student?</label>
                    </div>
                    <div className='labelContainer col-5'>
                        <label>Employer or occupation</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-6'>
                        {this.getAddress()}
                    </div>
                    <div className='col-1'>
                        {this.getStudent()}
                    </div>
                    <div className='col-5'>
                        {this.getJob()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Victim;
