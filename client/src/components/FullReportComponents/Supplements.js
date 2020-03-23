import React, { Component } from "react";
import {server} from '../../config'

class Supplements extends Component {
    state = {
        supplements: []
    };

    componentDidMount(){
        fetch(server+'/getSupplements/'+this.props.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    this.setState({supplements: data})
                })
            })
            .catch(err => console.error(err))
    }

    makeSupplementViews(data){
        let supplementViewList=[]
        for(var i=0;i<data.length;i++)
        {
            if(data[i].Narrative==null)
                continue
            supplementViewList.push(
            <div className="row" style={{marginBottom:'10px'}} key={i}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-8">
                            Created by: {data[i].OfficerName} on {data[i].Date} at {data[i].Time}
                        </div>
                        <div className="col-4">
                            Type: {data[i].SupplementType}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {data[i].Narrative}
                        </div>
                    </div>
                </div>
            </div>)
        }
        return supplementViewList
    }
    

    render() {
        return(
            <div className='row'>
                <div className='col-12'>
                    <label>Supplements</label>
                    <div style={{paddingLeft:'5px', paddingRight:'5px'}}>
                        {this.makeSupplementViews(this.state.supplements)}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Supplements;