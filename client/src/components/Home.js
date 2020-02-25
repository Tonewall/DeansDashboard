import React, { Component } from "react";
import './GtpdFilter.css';
import Filter from "./GtpdFilter"
import Data from './Data'

class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterState: null,
        };
        this.filterHandler = this.filterHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    filterHandler = (filterState) => {
        this.setState({
            filterState: filterState
        })
    }


    submitHandler = (filterState) => {
        this.setState({filterState: filterState})
    }

    render() {
        return(
            <div className="main filterCardMain">
                    <div className="card-body">
                            <div className="row">
                                <div className="col-2">
                                    <Filter filterHandler={this.filterHandler} submitHandler={this.submitHandler}/>
                                </div>
                                <div className="col-10">
                                    <Data filterState={this.state.filterState}/>
                                </div>
                            </div>

                </div>
            </div>
        );
    }
}
export default gtpdFilter;