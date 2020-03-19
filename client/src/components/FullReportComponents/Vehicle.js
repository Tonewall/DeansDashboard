import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Vehicle extends Component {

    getVehicleTag() {return(<div><input readOnly value={this.props.vehicle.Tag ? " " + this.props.vehicle.Tag : ''} style={{ width: "100%" }}/></div>)}

    getState() {return(<div><input readOnly value={this.props.vehicle.TagST ? " " + this.props.vehicle.TagST : ''} style={{ width: "100%" }}/></div>)}

    getYear() {return(<div><input readOnly value={this.props.vehicle.RegistrationYear ? " " + this.props.vehicle.RegistrationYear : ''} style={{ width: "100%" }}/></div>)}

    getVIN() {return(<div><input readOnly value={this.props.vehicle.VIN ? " " + this.props.vehicle.VIN : ''} style={{ width: "100%" }}/></div>)}

    getMake() {return(<div><input readOnly value={this.props.vehicle.Make ? " " + this.props.vehicle.Make : ''} style={{ width: "100%" }}/></div>)}

    getModel() {return(<div><input readOnly value={this.props.vehicle.VehicleYear ? " " + this.props.vehicle.VehicleYear + (this.props.vehicle.Mode ? " " + this.props.vehicle.Mode : '') : ''} style={{ width: "100%" }}/></div>)}

    getStyle() {return(<div><input readOnly value={this.props.vehicle.VehicleStyle ? " " + this.props.vehicle.VehicleStyle : ''} style={{ width: "100%" }}/></div>)}

    getColor() {return(<div><input readOnly value={this.props.vehicle.PrimaryColor ? " " + this.props.vehicle.PrimaryColor : ""} style={{ width: "100%" }}/></div>)}

    getMotor() {return(<div><input readOnly value={this.props.vehicle.MotorSize ? " " + this.props.vehicle.MotorSize : ""} style={{ width: "100%" }}/></div>)}

    getTransmission() {
        var transmission=''
        if(this.props.vehicle.Transmission) {
            if(this.props.vehicle.Transmission === 'A') {
                transmission = 'Automatic'
            } else if(this.props.vehicle.Transmission === 'M') {
                transmission = 'Manual'
            } else if(this.props.vehicle.Transmission === 'S') {
                transmission = 'SPD'
            } 
        }
        return(
        <div><input readOnly value={transmission} style={{ width: "100%" }}/></div>
        )
    }

    getInsurance() {return(<div><input readOnly value={this.props.vehicle.InsuranceCompany ? " " + this.props.vehicle.InsuranceCompany : ''} style={{ width: "100%" }}/></div>)}

    getStolen() {
      return(<div><input className="row" type="checkbox" checked={this.props.vehicle.StolenVehicle} disabled/></div>)
    }
    getRecovered() {
      return(<div><input className="row" type="checkbox" checked={this.props.vehicle.RecoveredVehicle} disabled/></div>)
    }
    getSuspects() {
      return(<div><input className="row" type="checkbox" checked={this.props.vehicle.SuspectsVehicle} disabled/></div>)
    }

    getVehicle() {
        return(
            <div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        <label>Tag Number</label>
                    </div>
                    <div className='col-1'>
                        <label>State</label>
                    </div>
                    <div className='col-1'>
                        <label>Reg. Year</label>
                    </div>
                    <div className='col-3'>
                        <label>VIN</label>
                    </div>
                    <div className='col-1'>
                        <label>Stolen</label>
                    </div>
                    <div className='col-1'>
                        <label>Recovered</label>
                    </div>
                    <div className='col-1'>
                        <label>Suspects</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        {this.getVehicleTag()}
                    </div>
                    <div className='col-1'>
                        {this.getState()}
                    </div>
                    <div className='col-1'>
                        {this.getYear()}
                    </div>
                    <div className='col-3'>
                        {this.getVIN()}
                    </div>
                    <div className='col-1'>
                        {this.getStolen()}
                    </div>
                    <div className='col-1'>
                        {this.getRecovered()}
                    </div>
                    <div className='col-1'>
                        {this.getSuspects()}
                    </div>
                </div>

                <div className='unitGap'></div>

                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        <label>Make</label>
                    </div>
                    <div className='col-2'>
                        <label>Model</label>
                    </div>
                    <div className='col-2'>
                        <label>Style</label>
                    </div>
                    <div className='col-2'>
                        <label>Color</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        {this.getMake()}
                    </div>
                    <div className='col-2'>
                        {this.getModel()}
                    </div>
                    <div className='col-2'>
                        {this.getStyle()}
                    </div>
                    <div className='col-2'>
                        {this.getColor()}
                    </div>
                </div>

                <div className='unitGap'></div>

                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        <label>Motor Size</label>
                    </div>
                    <div className='col-2'>
                        <label>Transmission</label>
                    </div>
                    <div className='col-6'>
                        <label>Insured By</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        {this.getMotor()}
                    </div>
                    <div className='col-2'>
                        {this.getTransmission()}
                    </div>
                    <div className='col-6'>
                        {this.getInsurance()}
                    </div>
                </div>

                <div className='unitGap'></div>

            </div>
        )
    }


    render() {
        return(
            this.getVehicle()
            
        )
    }
}

export default Vehicle;
