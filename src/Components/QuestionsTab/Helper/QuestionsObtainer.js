import React from 'react';
import './App.css';
import * as apis from '../../../proto/apis_pb'

const {NearbyViewGetQuestionsRequest, NearbyViewGetQuestionsResponse, Coordinates} = apis;

function makeRequest(spaceID) {
    // QUESTIONS
    const coords = new Coordinates();
    const req2 = new NearbyViewGetQuestionsRequest();
    coords.setLatitude(36);
    coords.setLongitude(-78);
    req2.setCoordinates(coords);
    req2.setDistanceLimit(1000000000.0);

    return req2;
}

function App2() {
    const [spaceID, setSpaceID] = React.useState("");
    const [name, setName] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [lng, setLng] = React.useState("");
    const [QList, setQList] = React.useState("");

    const spaceIDChanged = (evt) => setSpaceID(evt.target.value);

    const fetchQuestions = () => {
        fetch('https://zoro.ourspace.dev/nearby_view/get_questions', {
            method: 'post',
            headers: {
                'Authorization': "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
            },
            body: makeRequest().serializeBinary(),
        })
            .then(res => res.arrayBuffer())
            .then(buf => NearbyViewGetQuestionsResponse.deserializeBinary(buf))
            .then(response => response.getCustomQuestionsList())
            .then(QList => { // QList is a list of NearbyViewDefaultQuestion
                console.log(QList);
                setName(QList[3].getUser().getFirstName());
                setLat(QList[3].getSpace().getCoordinates().getLatitude());
                setLng(QList[3].getSpace().getCoordinates().getLongitude());
                setQList(QList);

                QList.map((item => {
                    console.log(item.getUser().getFirstName())
                }))
            });
    }
    return (
        {QList}
    )
}