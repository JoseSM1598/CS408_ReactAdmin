import React, { Component } from 'react';
import QuestionList from "../QuestionList";
import SearchInput from "../Helper/SearchInput";

import * as apis from '../../../proto/apis_pb'
const {NearbyViewGetQuestionsRequest, NearbyViewGetQuestionsResponse, Coordinates} = apis;


// Filter Function
// Searching by the name of the LOCATION
function filterResults(searchText, maxResults, data) {
    return data
        .filter(item => {
            if (item.getSpace().getName().toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            return false;
        })
        .slice(0, maxResults);
}

// Search By Location Component
class SearchByLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredResults: filterResults("", 20, this.props.QList),
            //filteredResults: [],
            overlayClicked: "nothing"
        };

    }


    handleSearchChange = event => {
        this.setState({
            filteredResults: filterResults(event.target.value, 20, this.props.QList)
        });
    };


    render(){
        // const { filteredResults } = this.state;
        //
        // if (filteredResults === null) { return null }
        return(
            <div>
                <SearchInput textChange={this.handleSearchChange} text={"Search by Location"} />
                <QuestionList QList = {this.state.filteredResults} />
            </div>
        )
    }
}

export default SearchByLocation