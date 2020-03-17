import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

class Vehicle extends Component {
    state = {
        incidentNumber: null,
        vehicle: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
    }
    getIncidentData() {
        fetch(server+'/getProperty/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        console.log(data)
                        this.setState({vehicle: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getVehicleTag(i) {return(<div><input readOnly value={this.state.vehicle[i].Tag ? " " + this.state.vehicle[i].Tag : ''} style={{ width: "100%" }}/></div>)}

    getState(i) {return(<div><input readOnly value={this.state.vehicle[i].TagST ? " " + this.state.vehicle[i].TagST : ''} style={{ width: "100%" }}/></div>)}

    getYear(i) {return(<div><input readOnly value={this.state.vehicle[i].RegistrationYear ? " " + this.state.vehicle[i].RegistrationYear : ''} style={{ width: "100%" }}/></div>)}

    getVIN(i) {return(<div><input readOnly value={this.state.vehicle[i].VIN ? " " + this.state.vehicle[i].VIN : ''} style={{ width: "100%" }}/></div>)}

    getMakeYear(i) {return(<div><input readOnly value={this.state.vehicle[i].VehicleYear ? " " + this.state.vehicle[i].VehicleYear : ''} style={{ width: "100%" }}/></div>)}

    getMake(i) {return(<div><input readOnly value={this.state.vehicle[i].Make ? " " + this.state.vehicle[i].Make : ''} style={{ width: "100%" }}/></div>)}

    getModel(i) {return(<div><input readOnly value={this.state.vehicle[i].Mode ? " " + this.state.vehicle[i].Mode : ''} style={{ width: "100%" }}/></div>)}

    getStyle(i) {return(<div><input readOnly value={this.state.vehicle[i].VehicleStyle ? " " + this.state.vehicle[i].VehicleStyle : ''} style={{ width: "100%" }}/></div>)}

    getColor(i) {return(<div><input readOnly value={this.state.vehicle[i].PrimaryColor ? " " + this.state.vehicle[i].PrimaryColor : ""} style={{ width: "100%" }}/></div>)}

    getMotor(i) {return(<div><input readOnly value={this.state.vehicle[i].MotorSize ? " " + this.state.vehicle[i].MotorSize : ""} style={{ width: "100%" }}/></div>)}

    getTransmission(i) {
        var transmission=''
        if(this.state.vehicle[i].Transmission) {
            if(this.state.vehicle[i].Transmission === 'A') {
                transmission = 'Automatic'
            } else if(this.state.vehicle[i].Transmission === 'M') {
                transmission = 'Manual'
            } else if(this.state.vehicle[i].Transmission === 'S') {
                transmission = 'SPD'
            } 
        }
        return(
        <div><input readOnly value={transmission} style={{ width: "100%" }}/></div>
        )
    }

    getInsurance(i) {return(<div><input readOnly value={this.state.vehicle[i].InsuranceCompany ? " " + this.state.vehicle[i].InsuranceCompany : ''} style={{ width: "100%" }}/></div>)}

    getBlank() {return (<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}

    getStatus(i) {
        if(this.state.vehicle && this.state.vehicle[i]) {
            return (
                <div className="row">
                    <div className='col-1'></div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Stolen</label>
                        <input className="row" type="checkbox" checked={this.state.vehicle[i].StolenVehicle} disabled/>
                    </div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Recovered</label>
                        <input className="row" type="checkbox" checked={this.state.vehicle[i].RecoveredVehicle} disabled/>
                    </div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Suspects</label>
                        <input className="row" type="checkbox" checked={this.state.vehicle[i].SuspectsVehicle} disabled/>
                    </div>   
                </div>
            )
        } else {
            return(
                <div className="row">
                    <div className='col-1'></div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Stolen</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Recovered</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>
                    <div className="col-3">
                        <label className="row" for="inlineCheckbox3">Suspects</label>
                        <input className="row" type="checkbox" checked={false} disabled/>
                    </div>   
                </div>
            )
        }
        
    }
    // getPlateStatus(i) {
    //     return (
    //         <div className="row">
    //             <div className="col-6">
    //                 <label className="row" for="inlineCheckbox3">Plate Only</label>
    //                 <input className="row" type="checkbox" checked={this.state.vehicle[i].} disabled/>
    //             </div>
    //             <div className="col-6">
    //                 <label className="row" for="inlineCheckbox3">VIN Plate only</label>
    //                 <input className="row" type="checkbox" checked={this.state.vehicle[i].} disabled/>
    //             </div>
    //         </div>
    //     )
    // }


    getVehicle() {
        if(this.state.vehicle && this.state.vehicle[0]) {
            for(var i = 0; i < this.state.vehicle.length; i++) {
                if(this.state.vehicle[i].Vehicle) {
                    return(
                        <div>
                            <div className="row">
                                <div className='col-3'>
                                    {this.getStatus(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Tag Number</label>
                                    {this.getVehicleTag(i)}
                                </div>
                                <div className='col-1'>
                                    <label>State</label>
                                    {this.getState(i)}
                                </div>
                                <div className='col-1'>
                                    <label>Reg. Year</label>
                                    {this.getYear(i)}
                                </div>
                                <div className='col-2'>
                                    <label>VIN</label>
                                    {this.getVIN(i)}
                                </div>
                                {/* <div className='col-2'>
                                    {this.getPlateStatus(i)}
                                </div> */}
                            </div>
                            <div className="row">
                                <div className='col-1'>
                                    <label>Year</label>
                                    {this.getMakeYear(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Make</label>
                                    {this.getMake(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Model</label>
                                    {this.getModel(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Style</label>
                                    {this.getStyle(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Color</label>
                                    {this.getColor(i)}
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-2'>
                                    <label>Motor Size</label>
                                    {this.getMotor(i)}
                                </div>
                                <div className='col-2'>
                                    <label>Transmission</label>
                                    {this.getTransmission(i)}
                                </div>
                                <div className='col-8'>
                                    <label>Insured By</label>
                                    {this.getInsurance(i)}
                                </div>
                            </div>
                        </div>
                    
                    )
                }
            }
        }
        return(
            <div>
                <div className="row">
                    <div className='col-3'>
                        {this.getStatus(0)}
                    </div>
                    <div className='col-2'>
                        <label>Tag Number</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-1'>
                        <label>State</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-1'>
                        <label>Reg. Year</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>VIN</label>
                        {this.getBlank()}
                    </div>
                    {/* <div className='col-2'>
                        {this.getPlateStatus()}
                    </div> */}
                </div>
                <div className="row">
                    <div className='col-1'>
                        <label>Year</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>Make</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>Model</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>Style</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>Color</label>
                        {this.getBlank()}
                    </div>
                </div>
                <div className="row">
                    <div className='col-2'>
                        <label>Motor Size</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-2'>
                        <label>Transmission</label>
                        {this.getBlank()}
                    </div>
                    <div className='col-8'>
                        <label>Insured By</label>
                        {this.getBlank()}
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return(
            <div>
                {this.getVehicle()}
            </div>
            
        )
    }
}

export default Vehicle;
