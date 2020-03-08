import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import Home from './components/Home'
import FullReport from './components/FullReport'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css'
import {NotificationContainer} from 'react-notifications'


class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <NotificationContainer/>
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Data" component={DataView} />
                    <Route exact path="/full-report/:incidentNumber" component={FullReport} />
                </Router>
            </div>
        );
    }
}

export default App;
