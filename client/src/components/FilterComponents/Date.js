import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const dateOptions = [
    {value: 'week', label: 'Past Week'},
    {value: 'month', label: 'Past Month'},
    {value: 'halfYear', label: 'Past Half Year'},
    {value: 'year', label: 'Past Year'},
];


class date extends Component {
    state = {
        endDate: null,
        startDate: null,
        selectedDate: null,
    };

    constructor(props) {
        super(props)
        this.state.endDate = new Date()
        this.state.startDate = new Date()
        this.state.startDate.setFullYear(this.state.startDate.getFullYear()-1)  // default period: one year
        props.dateHandler(this.state)
    }

    //changing the date based on the date range chosen
    setDate = selectedDate => {
        this.setState({selectedDate});
        //for the dropdown date ranges
        var date = new Date()
        var newDate = new Date()
        if(selectedDate.value === "week") {
            newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        } else if(selectedDate.value === "month") {
            var newMonth = newDate.getMonth() - 1;
            newDate.setMonth(newMonth);
        }else if(selectedDate.value === "halfYear") {
            newDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
        }else if(selectedDate.value === "year") {
            var newYear = newDate.getFullYear() - 1;
            newDate.setYear(newYear);
        }
        this.setState({startDate: newDate},
        function() {
            this.props.dateHandler(this.state)
        });
    }
    handleStartChange = date => {
        this.setState({startDate: date},
        function() {
            this.props.dateHandler(this.state)
        });
    };
    handleEndChange = date => {
        this.setState({endDate: date},
        function() {
            this.props.dateHandler(this.state)
        });
    };

    render() {
        const { selectedDate } = this.state;
        return(
            <div className="main">
                    <label>
                        Date Range
                    </label>
                    <div>
                        <Select 
                        value={selectedDate} 
                        onChange={this.setDate} 
                        options={dateOptions} 
                        placeholder={"Custom"}
                        />
                    </div>

                
                <div className="col-12">
                    <label className="dateLabel">From:</label>
                </div>
                <div className="col-12 dateFilters">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div className="col-12">
                    <label className="dateLabel">To:</label>
                </div>
                <div className="col-12 dateFilters">
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                </div>
            </div>
        )
    }
}
export default date;

