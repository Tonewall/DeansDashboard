import React, { Component } from "react";
import {server} from '../../config'

class Narrative extends Component {
    state = {
        narrative: ''
    };

    componentDidMount(){
        fetch(server+'/getNarrative/'+this.props.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    this.setState({narrative: data[0].Narrative, officer: data[0].ReportingOfficerName})
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return(
            <div className='row'>
                <div className='col-12'>
                    <label>Narrative</label>
                    <div style={{paddingLeft: '5px'}}>Created by: {this.state.officer}</div>
                    <div style={{paddingLeft:'5px', paddingRight:'5px'}}>{this.state.narrative}</div>
                </div>
            </div>
        )
    }
}

export default Narrative;
