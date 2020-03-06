import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { MDBDataTable } from 'mdbreact';


class Incident extends Component {
    state = {
        incidentNumber: null,
        incidentData: {rows: null, columns: null},
        location: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber})
        // this.getIncidentData()
    }

    // getIncidentData() {
    //     var incidentColumns= [
    //         {value: 'Incident Type', field:'Incident Type', label: 'Incident Type', width: 700},
    //         {value: 'Count', field:'Count', label: 'Count', width: 60},
    //         {value: 'Incident Code', field:'Incident Code', label: 'Incident Code', width: 200},
    //     ]
    //     var incidentRows = []

    //     this.setState({incidentData: {columns: incidentColumns, rows: incidentRows}})
    // }

    getIncidentType() {
        if(true){
            //put all of the incident types in the state and map it
            return(
                <div>
                    <input readOnly value={" Mental Health Issue or Concern - Involunatry Transport"} style={{ width: "100%" }}/>
                </div>
            )
        } 
        // var incidentType = this.state.incidentTypes.map((incident) => {
        //     return (
        //         <input readOnly value={" "+ incident} style={{ width: "100%" }}/>
        //     )
        //  }) 
    }
    getIncidentCount() {
        if(true){
            return(
                <div>
                    <input readOnly value={" "} style={{ width: "100%" }}/>
                </div>
            )
        }  
    }
    getIncidentCode() {
        if(true){
            return(
                <div>
                    <input readOnly value={" 9999MH"} style={{ width: "100%" }}/>
                </div>
            )
        }  
    }

    

    render() {
        return(
            <div className='row'>
                {/* <div className="col-12">
                    <MDBDataTable
                        scrollX
                        striped
                        bordered
                        hover
                        paging={false}
                        searching={false}
                        entries={20}
                        data={this.state.incidentData}
                    />
                    
                </div> */}
                <div className='col-8'>
                    <label>Incident Type</label>
                    {this.getIncidentType()}
                        
                </div>
                <div className='col-1'>
                    <label>Count</label>
                    {this.getIncidentCount()}
                </div>
                <div className='col-3'>
                    <label>Incident Code</label>
                    {this.getIncidentCode()}
                </div>
            </div>
            
        )
    }
}

export default Incident;
