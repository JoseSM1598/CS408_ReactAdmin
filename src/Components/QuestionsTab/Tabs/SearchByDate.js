
import React, { Component } from 'react';
import QuestionList from "../QuestionList";
import SearchInput from "../Helper/SearchInput";

import * as apis from '../../../proto/apis_pb'
const {} = apis;


// Filter Function
// Searching by the name of the Date
function filterResults(searchText, maxResults, data) {
    return data
        .filter(item => {
            var date =item.getQuestion().getCreatedAt().toString().toLowerCase()
            var date_fixed = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date)

            return date_fixed.includes(searchText.toLowerCase());

        })
        .slice(0, maxResults);
}

class SearchByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredResults: filterResults("", 20, this.props.QList),
            overlayClicked: "nothing"
        };
    }

    handleSearchChange = event => {
        this.setState({
            filteredResults: filterResults(event.target.value, 20, this.props.QList)
        });
    };
    render(){
        return(
            <div>
                <SearchInput textChange={this.handleSearchChange} text={"Search by Date"} />
                <QuestionList QList = {this.state.filteredResults} />
            </div>
        )
    }
}

export default SearchByDate