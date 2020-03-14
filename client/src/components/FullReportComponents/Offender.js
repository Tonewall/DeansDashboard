import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


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
        fetch('/getOffender/'+this.state.incidentNumber)
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
    getStatus() {
        if(this.state.offender && this.state.offender.length) {
            return (
                <div className="row">
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Wanted</label>
                        <input className="row" type="checkbox" checked={this.state.offender[0].Wanted} disabled/>
                    </div>
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Warrant</label>
                        <input className="row" type="checkbox" checked={this.state.offender[0].Warrant} disabled/>
                    </div>
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Arrest</label>
                        <input className="row" type="checkbox" checked={this.state.offender[0].Arrest} disabled/>
                    </div>   
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Arrest</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Warrant</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>
                    <div className="col-4">
                        <label className="row" for="inlineCheckbox3">Arrest</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>   
                </div>
            )
        }
    }
    getAddress() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].HomeAddress){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].HomeAddress} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getCenusTract() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].CensusTract){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].CensusTract} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getHeight() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].Height){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].Height} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getWeight() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].Weight){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].Weight} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getHair() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].Hair){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].Hair} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getEyes() {
        if(this.state.offender && this.state.offender[0] && this.state.offender[0].Eyes){
            return(
                <div>
                    <input readOnly value={" " + this.state.offender[0].Eyes} style={{ width: "100%" }}/>
                </div>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }

    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-3'>
                        <label>Offender's Name</label>
                        {this.getOffenderName()}
                    </div>
                    <div className='col-1'>
                        <label>Race</label>
                        {this.getRace()}
                    </div>
                    <div className='col-1'>
                        <label>Sex</label>
                        {this.getSex()}
                    </div>
                    <div className='col-2'>
                        <label>Date of Birth</label>
                        {this.getDOB()}
                    </div>
                    <div className='col-1'>
                        <label>Age</label>
                        {this.getAge()}
                    </div>
                    <div className='col-3'>
                        {this.getStatus()}
                    </div>
                </div>
                <div className="row">
                    <div className='col-6'>
                        <label>Offender's Address</label>
                        {this.getAddress()}
                    </div>
                    <div className='col-2'>
                        <label>Census Tract</label>
                        {this.getCenusTract()}
                    </div>
                    <div className='col-1'>
                        <label>Height</label>
                        {this.getHeight()}
                    </div>
                    <div className='col-1'>
                        <label>Weight</label>
                        {this.getWeight()}
                    </div>
                    <div className='col-1'>
                        <label>Hair</label>
                        {this.getHair()}
                    </div>
                    <div className='col-1'>
                        <label>Eyes</label>
                        {this.getEyes()}
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Offender;
