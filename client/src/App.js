import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import Home from './components/Home'
import FullReport from './components/FullReport'
import FullReportRevise from './components/FullReportRevise'
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Data" component={DataView} />
                    <Route exact path="/full-report/:incidentNumber" component={FullReport} />
                    <Route exact path="/full-report-revise/:incidentNumber" component={FullReportRevise} />
                </Router>
            </div>
        );
    }
}

export default App;
