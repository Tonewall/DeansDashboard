import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Data" component={DataView} />
                </Router>
            </div>
        );
    }
}

export default App;
