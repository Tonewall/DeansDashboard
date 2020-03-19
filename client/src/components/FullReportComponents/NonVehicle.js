import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class NonVehicle extends Component {

    getItemValue() {return(<div><input readOnly value={this.props.data.ItemValue ? " " + this.props.data.ItemValue : ''} style={{ width: "100%" }}/></div>)}

    getQuantity() {return(<div><input readOnly value={this.props.data.Quantity ? " " + this.props.data.Quantity : ''} style={{ width: "100%" }}/></div>)}

    getDescription() {return(<div><input readOnly value={this.props.data.ItemDescription ? " " + this.props.data.ItemDescription : ''} style={{ width: "100%" }}/></div>)}

    getMake() {return(<div><input readOnly value={this.props.data.Make ? " " + this.props.data.Make : ''} style={{ width: "100%" }}/></div>)}

    getModel() {return(<div><input readOnly value={this.props.data.Model ? " " + this.props.data.Model : ''} style={{ width: "100%" }}/></div>)}

    getSerialNumber() {return(<div><input readOnly value={this.props.data.SerialNumber ? " " + this.props.data.SerialNumber : ''} style={{ width: "100%" }}/></div>)}

    getColor() {return(<div><input readOnly value={this.props.data.PrimaryColor ? " " + this.props.data.PrimaryColor : ''} style={{ width: "100%" }}/></div>)}

    getNonVehicle() {
        return(
            <div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        <label>Item Value</label>
                    </div>
                    <div className='col-1'>
                        <label>Quantity</label>
                    </div>
                    <div className='col-7'>
                        <label>Description</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-2'>
                        {this.getItemValue()}
                    </div>
                    <div className='col-1'>
                        {this.getQuantity()}
                    </div>
                    <div className='col-7'>
                        {this.getDescription()}
                    </div>
                </div>

                <div className='unitGap'></div>

                <div className="row">
                    <div className='col-1'/>
                    <div className='col-3'>
                        <label>Make</label>
                    </div>
                    <div className='col-3'>
                        <label>Model</label>
                    </div>
                    <div className='col-3'>
                        <label>SerialNumber</label>
                    </div>
                    <div className='col-1'>
                        <label>Color</label>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'/>
                    <div className='col-3'>
                        {this.getMake()}
                    </div>
                    <div className='col-3'>
                        {this.getModel()}
                    </div>
                    <div className='col-3'>
                        {this.getSerialNumber()}
                    </div>
                    <div className='col-1'>
                        {this.getColor()}
                    </div>
                </div>

                <div className='unitGap'></div>

            </div>
        )
    }


    render() {
        return(
            this.getNonVehicle()
            
        )
    }
}

export default NonVehicle;
