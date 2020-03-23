import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

class Offender extends Component {
    state = {
        incidentNumber: null,
        offender: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch(server+'/getOffender/'+this.state.incidentNumber, {credentials: 'include'})
                .then(results => {
                    results.json().then(data => {
                        this.setState({offender: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getOffenderName() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender) =>
                <input readOnly key={offender.FirstName} value={" "+ ((offender.FirstName === null) ? "" : offender.FirstName) + " " + ((offender.LastName === null) ? "" : offender.LastName)} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }

    }
    getRace() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input readOnly key={index} value={(offender.Race === null) ? "" : " "+ offender.Race} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getAge() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input readOnly key={index} value={(offender.Age === null) ? "" : " "+ offender.Age} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getSex() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input readOnly key={index} value={(offender.Sex === null) ? "" : " "+ offender.Sex} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getDOB() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input readOnly key={index} value={(offender.DOB === null) ? "" : " "+ offender.DOB.toString().substring(0,10)} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getWanted() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input className="row" type="checkbox" key={index} checked={offender.Wanted && offender.Wanted=='1'} disabled/>
            ) 
            return offenders
        } else {return(<input type="checkbox" checked={false} disabled/>)}
    }
    getWarrant() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input className="row" type="checkbox" key={index} checked={offender.Warrant && offender.Warrant=='1'} disabled/>
            ) 
            return offenders
        } else {return(<input type="checkbox" checked={false} disabled/>)}
    }
    getArrest() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input className="row" type="checkbox" key={index} checked={offender.Arrest && offender.Arrest=='1'} disabled/>
            ) 
            return offenders
        } else {return(<input type="checkbox" checked={false} disabled/>)}
    }
    getArrestAtScene() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
                <input className="row" type="checkbox" key={index} checked={offender.ArrestScene && offender.ArrestScene=='1'} disabled/>
            ) 
            return offenders
        } else {return(<input className="row" type="checkbox" checked={false} disabled/>)}
    }
    getAddress() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
            <input readOnly key={index} value={" "+(offender.HomeAddress?offender.HomeAddress+(offender.City?", "+offender.City+(offender.State?", "+offender.State:""):""):"")} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    
    getHeight() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
            <input readOnly key={index} value={(offender.Height === null) ? "" : " "+ offender.Height} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getWeight() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
            <input readOnly key={index} value={(offender.Weight === null) ? "" : " "+ offender.Weight} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getHair() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
            <input readOnly key={index} value={(offender.Hair === null) ? "" : " "+ offender.Hair} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getEyes() {
        if(this.state.offender && this.state.offender.length){
            var offenders = this.state.offender.map((offender, index) =>
            <input readOnly key={index} value={(offender.Eyes === null) ? "" : " "+ offender.Eyes} style={{ width: "100%" }}/>
            ) 
            return offenders
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='labelContainer col-3'>
                        <label>Offender's Name</label>
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
                    <div className='labelContainer col-2'>
                        <label>Date of Birth</label>
                    </div>
                    <div className='col-1'>
                        <label>Height</label>
                    </div>
                    <div className='col-1'>
                        <label>Weight</label>
                    </div>
                    <div className='col-1'>
                        <label>Hair</label>
                    </div>
                    <div className='col-1'>
                        <label>Eyes</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        {this.getOffenderName()}
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
                    <div className='col-2'>
                        {this.getDOB()}
                    </div>
                    <div className='col-1'>
                        {this.getHeight()}
                    </div>
                    <div className='col-1'>
                        {this.getWeight()}
                    </div>
                    <div className='col-1'>
                        {this.getHair()}
                    </div>
                    <div className='col-1'>
                        {this.getEyes()}
                    </div>
                </div>
                <div className='unitGap'></div>
                <div className="row">
                    <div className='col-6'>
                        <label>Offender's Address</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Wanted</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Warrant</label>
                    </div>
                    <div className='labelContainer col-1'>
                        <label>Arrest</label>
                    </div>
                    <div className='labelContainer col-2'>
                        <label>Arrested At Scene</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-6'>
                        {this.getAddress()}
                    </div>
                    <div className='col-1'>
                        {this.getWanted()}
                    </div>
                    <div className='col-1'>
                        {this.getWarrant()}
                    </div>
                    <div className='col-1'>
                        {this.getArrest()}
                    </div>
                    <div className='col-2'>
                        {this.getArrestAtScene()}
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Offender;
