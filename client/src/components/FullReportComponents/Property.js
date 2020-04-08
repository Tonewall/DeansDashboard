import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'
import Vehicle from './Vehicle'
import NonVehicle from './NonVehicle'

class Property extends Component {
    state = {
        incidentNumber: null,
        property: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
      fetch(server+'/getProperty/'+this.state.incidentNumber, {credentials: 'include'})
              .then(results => {
                  results.json().then(data => {
                      this.setState({property: data})
                  })
              })
              .catch(err => console.error(err))
    }

    renderProperty(property, index) {
      if( (!property.Vehicle) && (!property.TypeCode) && (!property.ItemValue) && 
          (!property.ItemDescription) && (!property.Make) && (!property.Model))
          return null
      
      return (
        <div>
          <div className="row">
            <div className="col-4">
              <label>Property Type</label>
            </div>
            <div className="col-2"> 
              <label>Reported As</label>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <input readOnly value={property.PropertyTypeDesc ? " " + property.PropertyTypeDesc : ""} style={{ width: "100%" }}/>
            </div>
            <div className="col-2"> 
              <input readOnly value={property.ReportedAsDesc ? " " + property.ReportedAsDesc : ""} style={{ width: "100%" }}/>
            </div>
          </div>

          <div className='unitGap'></div>

          {property.Vehicle ? <Vehicle vehicle={property} key={index}/> : <NonVehicle data={property} key={index}/>}
        </div>
      )
    }

    renderPropertyList() {
      if(this.state.property && this.state.property.length){
          var properties = this.state.property.map((property, index) =>this.renderProperty(property, index)) 
          return properties
      } else {return null}
    }

    render() {
        return(
            <div>
                {this.renderPropertyList()}
            </div>
        )
    }
}

export default Property;
