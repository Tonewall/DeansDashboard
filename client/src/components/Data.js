import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            row['Case'] = <Link to={link} target="_blank">{incidentNumber}</Link>
            
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
            }
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
        );
    }
}

export default Data;