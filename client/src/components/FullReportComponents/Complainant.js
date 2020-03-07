import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";


class Complainant extends Component {
    state = {
        incidentNumber: null,
        complainant: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/getComplainant/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({complainant: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getComplainantName() {
        if(this.state.complainant && this.state.complainant[0]){
            return(
                <div>
                    <input readOnly value={" " + this.state.complainant[0].FirstName + " " + this.state.complainant[0].LastName} style={{ width: "100%" }}/>
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
    getComplainantAddress() {
        if(this.state.complainant && this.state.complainant[0]){
            return(
                <div>
                    <input readOnly value={" " + this.state.complainant[0].HomeAddress} style={{ width: "100%" }}/>
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
    getComplainantPhone() {
        if(this.state.complainant && this.state.complainant[0]){
            return(
                <div>
                    <input readOnly value={" " + this.state.complainant[0].Phone} style={{ width: "100%" }}/>
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
            <div className='row'>
                <div className='col-3'>
                    <label>Complainant</label>
                    {this.getComplainantName()}
                        
                </div>
                <div className='col-6'>
                    <label>Address</label>
                    {this.getComplainantAddress()}
                </div>
                <div className='col-3'>
                    <label>Phone Number</label>
                    {this.getComplainantPhone()}
                </div>
            </div>
            
        )
    }
}

export default Complainant;
