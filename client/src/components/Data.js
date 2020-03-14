import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import {NotificationManager} from 'react-notifications'

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            crimeData: {
                coulumns: [],
                rows: []
            }
        }
    }

    
    populateData = function (data) {
        var rows = [];
        var columns = [
            {value: 'Case', field:'Case', label: 'Case', width: 80},
            {value: 'Report Date', field:'Report Date', label: 'Report Date', width: 120},
            {value: 'Approved Date', field:'Approved Date', label: 'Approved Date', width: 120},
            {value: 'Status', field:'Status', label: 'Status', width: 180},
            {value: 'Description', field:'Description', label: 'Description', width: 240},
            {value: 'Location', field:'Location', label: 'Location',  width: 300}
        ]

        //for every incident, populate a blank row with the column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var incidentNumber = data[i]['Case']
            var link = "./full-report/"+incidentNumber
            
            /* control full report access */
                // eslint-disable-next-line
            if(data[i]['Juvenile']==1)
            {
                // eslint-disable-next-line
                row['Case'] = <a style={{color:'red', textDecoration:'underline'}} onClick={()=>{NotificationManager.error("", "Cannot access juvenile report", 1500)}}>{incidentNumber}</a>
            }
            else if(data[i]['Approved Date']==null)
            {
                // eslint-disable-next-line
                row['Case'] = <a style={{color:'darkorange', textDecoration:'underline'}} onClick={()=>{NotificationManager.warning("", "Please wait for approval", 1500)}}>{incidentNumber}</a>
            }
            else
            {
                row['Case'] = <a href={link} target="_blank" style={{textDecoration:'underline'}}>{incidentNumber}</a>
            }
            
            for(var j = 1; j < columns.length; j++) {
                if(data[i][columns[j].field] == null || data[i][columns[j].field] === " "){ 
                    row[columns[j].field] = '-'
                } else {
                    row[columns[j].field] = data[i][columns[j].field].toString()
                }
            }
            rows.push(row)
        }

        this.setState({
            crimeData: {
                columns: columns,
                rows: rows
            },
            loading: false
        })
    }
    

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterState !== prevProps.filterState ||
                this.props.instantSearchState !== prevProps.instantSearchState) {
            this.getData()
        }
    }

    getData() {
        this.setState({loading: true});
        if(this.props.filterState)
        {
            fetch('/filter',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(this.props.filterState)
                }
            )
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
        }
        else if(this.props.instantSearchState)
        {
            fetch('/search/'+this.props.instantSearchState.incidentNumber)
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
        }
        else
        {
            fetch('/showall')
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
        }
    }

    render() {
        return (
            !this.state.loading ?
            <div className="main">
                <div className="card" style={{marginBottom:30, fontSize: 12}}>
                    <div className="card-body" >
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={20}
                            data={this.state.crimeData}
                        />
                    </div>
                </div>
            </div>
            :
            <div className="col-12 fas fa-spinner fa-spin" style={{color: '#777',height:'70px', fontSize:'70px', textAlign:'center', marginTop:'100px'}}></div>
        );
    }
}

export default Data;