import React, { PureComponent } from "react";
import SearchInput from "./SearchInput";
import SpaceResults from "./SpaceResults";
import filterResults from "./filterResults";
import SpaceSubNavBar from "./SpaceSubNavBar";
import SpacesOverlay from "./SpacesOverlay";
import Mapv2 from "../MapComponentv2";
import { Col, Row } from "reactstrap";
import * as apis from "../../proto/apis_pb";
import parseAddress from "./parseAddress";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
import { filterAnswers } from "./filterQA";

const {
  GetAllSpacesResponse,
  GetNearbySpaceRequest,
  GetNearbySpaceResponse,
  SearchSpaceByNameRequest,
  SearchSpaceByNameResponse,
  GetAllQuestionsRequest,
  GetAllQuestionsResponse,
  AskSpaceViewGetDefaultQuestionRequest,
  AskSpaceViewGetDefaultQuestionResponse,
  GetAllAnswersRequest,
  GetAllAnswersResponse,
  Coordinates
} = apis;

export default class SpacesTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredResults: [],
      maxResults: 50,
      overlaySpaceObject: null,
      searchBy: "searchbyname",
      SList: [],
      QListForSpace: [],
      nearbySpaces: [],
      overlayDisplay: false,
      addressSearch: "",
      searchInput: "west union",
      searchArea: "durham",
      customQuestionsList: [],
      defaultQuestionsList: [],
      AnswersList: [],
      filteredAnswers: [],
      overlayDefaultQuestion: null //deprecated DEFAULTQUESTION object
    };
  }

  handleSearchInputChange = event => {
    //real-time handles search input text change
    // if (this.state.searchBy != "searchbylocation") {
    //   this.setState({
    //     filteredResults: this.fetchSpacesByQuery(event.target.value)
    //   });
    // }
    this.setState({
      searchInput: event.target.value
    });
  };

  handleSearchInputClick = () => {
    //real-time handles search input text change
    if (this.state.searchBy == "searchbyname") {
      this.fetchSpacesByQuery(this.state.searchInput);
    }
    if (this.state.searchBy == "searchbylocation") {
      this.fetchSpacesByGoogleMapsString(
        this.state.searchInput,
        this.state.searchArea
      );
    }
  };

  handleSpaceObjectClick = spaceObject => {
    this.setState({
      overlayDisplay: !this.state.overlayDisplay
    });
    if (spaceObject !== "close") {
      this.setState({
        overlaySpaceObject: spaceObject
      });
      this.getOverlayAnswerObject(spaceObject);
    }
  };

  getOverlayAnswerObject(overlaySpaceObject) {
    // FIX WHEN API IS AVAILABLE
    const spaceID = overlaySpaceObject.getSpaceId();
    this.setState({
      filteredAnswers: this.state.AnswersList.splice(0, 5) //filterAnswers(this.state.AnswersList, spaceID) //FOR LATER THIS IS A PLACEHOLDER UNTIL API IS AVAILABLE (HAS SPACE DATA)
    });
    //(filterAnswers(this.state.AnswersList, spaceID));
  }

  handleTabsClick = tabName => {
    //handles subnavbar tab selection
    this.setState({
      searchBy: tabName
    });
  };

  //
  // SPACES APIS
  //

  fetchAllSpaces() {
    // NOT BEING USED
    fetch("https://apollo.ourspace.dev/details/all", {
      method: "get"
    })
      .then(res => res.arrayBuffer())
      .then(buf => GetAllSpacesResponse.deserializeBinary(buf))
      .then(response => response.getSpacesList())
      .then(SList => {
        this.setState({
          SList: SList
        });
      });
  }

  makeSpacesByQueryRequest(string) {
    const coords = new Coordinates();
    const req2 = new SearchSpaceByNameRequest();
    coords.setLatitude(36); //DEFAULT DUKE CENTER
    coords.setLongitude(-78);
    req2.setQueryString(string);
    req2.setCoordinates(coords);
    req2.setIsValidCoordinates(true);
    return req2;
  }

  fetchSpacesByQuery(string) {
    fetch("https://apollo.ourspace.dev/search", {
      method: "post",
      body: this.makeSpacesByQueryRequest(string).serializeBinary()
    })
      .then(res => res.arrayBuffer())
      .then(buf => SearchSpaceByNameResponse.deserializeBinary(buf))
      .then(response => response.getResultsList())
      .then(SList => {
        this.setState({ filteredResults: SList });
      });
  }

  fetchSpacesByGoogleMapsString(string, area) {
    // TODO: average coordinates and max min - > then zoom MAPP
    var address = parseAddress(string, area);

    fetch(address)
      .then(res => res.json())
      .then(response => {
        if (response.results.length > 0) {
          var latlng = response.results[0].geometry.location;
          //console.log(latlng.lat + " " + latlng.lng);
          this.fetchNearbySpaces(latlng.lat, latlng.lng);
        } else {
          this.setState({
            filteredResults: []
          });
        }
      });
  }

  makeNearbySpacesRequest(lat, lng) {
    const coords = new Coordinates();
    const req2 = new GetNearbySpaceRequest();
    coords.setLatitude(lat);
    coords.setLongitude(lng);
    req2.setCoordinates(coords);
    req2.setDistanceLimit(200); //unknown units of distance lol
    return req2;
    //FUTURE: use google maps to calculate within given bounded boxes instead of radial coordinates
  }

  fetchNearbySpaces(lat, lng) {
    fetch("https://apollo.ourspace.dev/nearby", {
      method: "post",
      body: this.makeNearbySpacesRequest(lat, lng).serializeBinary()
    })
      .then(res => res.arrayBuffer())
      .then(buf => GetNearbySpaceResponse.deserializeBinary(buf))
      .then(response => response.getSpacesList())
      .then(SList => {
        this.setState({
          filteredResults: SList.slice(0, this.state.maxResults)
        });
      });
  }

  //
  // QUESTIONS APIS
  //

  makeAllQuestionsRequest() {
    return new GetAllQuestionsRequest();
  }

  fetchAllQuestions() {
    //RETURNS DEFAULTQUESTION OBJECTS AT THE MOMENT (WAITING FOR SERVER 4.2 UPDATE)
    fetch("https://zoro.ourspace.dev/admin/get_all_questions", {
      method: "post",
      headers: {
        Authorization: "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
      },
      body: this.makeAllQuestionsRequest
    })
      .then(res => res.arrayBuffer())
      .then(buf => {
        return GetAllQuestionsResponse.deserializeBinary(buf); //return because api is void at the moment
      })
      .then(response => {
        this.setState({
          customQuestionsList: response.getCustomquestionsList(),
          defaultQuestionsList: response.getDefaultquestionsList()
        });
        //console.log(response.getCustomquestionsList());
      });
  }

  makeAllAnswersRequest() {
    return new GetAllAnswersRequest();
  }

  fetchAllAnswers() {
    //RETURNS DEFAULTQUESTION OBJECTS AT THE MOMENT (WAITING FOR SERVER 4.2 UPDATE)
    fetch("https://zoro.ourspace.dev/admin/get_all_answers", {
      method: "post",
      headers: {
        Authorization: "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
      },
      body: this.makeAllAnswersRequest
    })
      .then(res => res.arrayBuffer())
      .then(buf => {
        return GetAllAnswersResponse.deserializeBinary(buf); //return because api is void at the moment
      })
      .then(response => {
        this.setState({
          AnswersList: response.getAnswersList()
        });
      });
  }

  //
  // makeSpaceViewDefaultQuestionRequest(spaceID) {
  //   const req2 = new AskSpaceViewGetDefaultQuestionRequest();
  //   req2.setSpaceId(spaceID);
  //   return req2;
  // }

  // fetchSpaceViewDefaultQuestion(spaceID) {
  //   fetch("https://zoro.ourspace.dev/space_view/ask/get_default_question", {
  //     method: "post",
  //     headers: {
  //       Authorization: "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
  //     },
  //     body: this.makeSpaceViewDefaultQuestionRequest(spaceID)
  //   })
  //     .then(res => res.arrayBuffer())
  //     .then(buf => {
  //       AskSpaceViewGetDefaultQuestionResponse.deserializeBinary(buf); // POST 500 SERVER ERROR
  //     })
  //     .then(shit => console.log(shit));
  //   // .then(response => {
  //   //   this.setState({
  //   //     overlayDefaultQuestion: response.getQuestion()
  //   //   });
  //   //   console.log(response);
  //   // });
  // }

  //
  // RENDERING
  //

  componentDidMount() {
    this.fetchAllAnswers();
  }

  render() {
    let overlayObject;
    if (this.state.overlayDisplay) {
      overlayObject = (
        <SpacesOverlay
          overlaySpaceObject={this.state.overlaySpaceObject}
          overlayAnswers={this.state.filteredAnswers}
          closeClick={this.handleSpaceObjectClick}
        />
      );
    }

    let spaceResultsObject;
    if (this.state.filteredResults.length > 0) {
      spaceResultsObject = (
        <SpaceResults
          spaceData={this.state.filteredResults}
          spaceClick={this.handleSpaceObjectClick}
        />
      );
    } else {
      spaceResultsObject = (
        <div class="space-placeholder-text">
          <Typography variant="body1" color="textSecondary" component="p">
            Results are empty! <br />
            Search for something or try a different search! （╯°□°）╯︵( .o.)
          </Typography>
        </div>
      );
    }

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          margin: "5 0"
        }}
      >
        <Row>
          <Col style={{ height: "92vh" }} xs={6}>
            {" "}
            <Mapv2 QList={[]} spaceData={this.state.filteredResults} />{" "}
          </Col>
          <Col className="right-container" style={{ height: "92vh" }}>
            {overlayObject}
            <SpaceSubNavBar
              searchBy={this.state.searchBy}
              handleClick={this.handleTabsClick}
            />
            <SearchInput
              textChange={this.handleSearchInputChange}
              pressKey={this.handleSearchInputClick}
            />
            <div class="space-search">
              <Button
                onClick={this.handleSearchInputClick}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </div>
            {/* <SpaceResults
              spaceData={this.state.filteredResults}
              spaceClick={this.handleSpaceObjectClick}
            /> */}
            {spaceResultsObject}
          </Col>
        </Row>
      </div>
    );
  }
}
