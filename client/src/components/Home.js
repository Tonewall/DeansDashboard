import React, { Component } from "react";
import './Filter.css';
import Filter from "./Filter"
import InstantSearch from "./InstantSearch"
import Data from './Data'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterState: null,
            instantSearchState: null
        };
        this.filterSubmitHandler = this.filterSubmitHandler.bind(this)
        this.instantSearchHandler = this.instantSearchHandler.bind(this)
    }

    filterSubmitHandler = (filterState) => {
        this.setState({filterState: filterState, instantSearchState: null})
    }

    instantSearchHandler =  (instantSearchState) => {
        this.setState({filterState: null, instantSearchState: instantSearchState})
    }

    render() {
        return(
            <div className="main filterCardMain">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">
                                <Filter submitHandler={this.filterSubmitHandler}/>
                                <div style={{height:'20px'}} />
                                <InstantSearch submitHandler={this.instantSearchHandler}/>
                            </div>
                            <div className="col-10">
                                <Data filterState={this.state.filterState} instantSearchState={this.state.instantSearchState}/>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
export default Home;