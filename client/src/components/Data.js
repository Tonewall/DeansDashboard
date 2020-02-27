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
        console.log(data)
        var rows = [];
        var columns = [
            {value: 'Case#', field:'Incident Number', label: 'Incident Number', width: 100},
            {value: 'Report Date', field:'Report Date', label: 'Report Date', width: 100},
            {value: 'Approved Date', field:'DateApproved', label: 'Approved Date', width: 100},
            {value: 'Status', field:'Case Status', label: 'Status', width: 50},
            {value: 'Description', field:'Description', label: 'Description', width: 200},
            {value: 'Location', field:'Street', label: 'Location', width: 250},
            {value: 'Location Landmark', field:'Location Name', label: 'Landmark', width: 200},
        ]

        //for every incident, populate a blank row with the column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var incidentNumber = data[i]['Incident Number']
            var link = "./full-report/"+incidentNumber
            row['Incident Number'] = <Link to={link} target="_blank">{incidentNumber}</Link>
            
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
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: columns,
                rows: rows
            }
        })
    }
    

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/showall')
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterState !== prevProps.filterState) {
            this.filterData(this.props.filterState)
          }
        
    }
    filterData(filterState) {
        fetch('/filter',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(filterState)
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