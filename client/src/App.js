import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import GtpdFilter from './components/GtpdFilter';
import FilterResult from './components/FilterResult'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                    <Route exact path="/" component={DataView} />
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/Filter-Result" component={FilterResult} />
                    <Route exact path="/GTPD-Filter" component={GtpdFilter} />
                </Router>
            </div>
        );
    }
}

export default App;
