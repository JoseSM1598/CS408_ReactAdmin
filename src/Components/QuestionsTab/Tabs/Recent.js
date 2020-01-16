import React, { Component } from "react";
import QuestionList from "../QuestionList";
// import * as apis from '../../../proto/apis_pb'
// const {NearbyViewGetQuestionsRequest, NearbyViewGetQuestionsResponse, Coordinates} = apis;


class Recent extends Component {
    sort_list() {
        const myList = this.props.QList
        myList.sort((a, b) => (a.getQuestion().getCreatedAt() < b.getQuestion().getCreatedAt()) ? 1 : -1);
        return myList
    }

    render(){

        return(
            <QuestionList QList= {this.sort_list()}/>
        )
    }
}

{
  /*<QuestionList QData = {questions}/>*/
}
export default Recent;
