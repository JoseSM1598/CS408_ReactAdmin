import React from "react";
import OutsideAlerter from "./OutsideAlerter";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  SearchSpaceByNameRequest,
  SearchSpaceByNameResponse,
  Coordinates,
  Space,
  AskCustomQuestionRequest,
  AskCustomQuestionResponse
} from "../../proto/apis_pb";
import Downshift from "downshift";
import IntegrationDownshift from "./LocationAutocomplete";
import AddQuestionResponseDisplay from "./AddQuestionResponseDisplay";

class QuestionOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SpacesList: [],
      LocationValue: "",
      QuestionValue: "",
      Response: null,
      ShowReponse: false
    };
    this.fetchSpaces = this.fetchSpaces.bind(this);
    this.makeSpacesRequest = this.makeSpacesRequest.bind(this);
    this.askQuestionRequest = this.askQuestionRequest.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.getSpaceIdFromName = this.getSpaceIdFromName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseResponse = this.handleCloseResponse.bind(this);
    this.handleDropdownLocationChange = this.handleDropdownLocationChange.bind(
      this
    );
  }

  /*handleChange(event) { This is given in react documentation, why does this not work?
        this.setState({value: event.target.value});
    }*/

  handleCloseResponse() {
    console.log("in close response");
    this.setState({ ShowResponse: false });
  }

  handleChange = name => event => {
    //modified from materialui documentation
    console.log("In handleChange");
    console.log("printing event");
    console.log(event);
    this.setState({ [name]: event.target.value });
    setTimeout(() => {
      //without set timeout, the query string wasn't updating in time
      this.fetchSpaces();
    }, 100);
  };
  handleDropdownLocationChange(value) {
    this.setState({ LocationValue: value });
    setTimeout(() => {
      //without set timeout, the query string wasn't updating in time
      this.fetchSpaces();
    }, 100);
  }
  //gets space id of
  getSpaceIdFromName() {
    for (var i = 0; i < this.state.SpacesList.length; i++) {
      var mySpace = this.state.SpacesList[i];
      if (
        mySpace.getName().toLowerCase() ==
        this.state.LocationValue.toLowerCase()
      ) {
        return mySpace.getSpaceId();
      }
    }
  }

  askQuestionRequest() {
    const request = new AskCustomQuestionRequest();
    request.setUserId("X4EL9r5UvSMDTEOGIjj09KMnN7f2"); //inchans id
    request.setSpaceId(this.getSpaceIdFromName());
    console.log(this.getSpaceIdFromName());
    console.log(this.state.QuestionValue);
    request.setQuestionText(this.state.QuestionValue);
    request.setPrice(0);
    return request;
  }

  askQuestion() {
    console.log("==============");
    console.log("Asking question");
    console.log(this.state.LocationValue);
    //change url to common to fix it
    fetch("https://zoro.ourspace.dev/commn/custom", {
      method: "post",
      headers: {
        Authorization: "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
      },
      body: this.askQuestionRequest().serializeBinary()
      //don't need anything after right?
    })
      .then(res => {
        console.log(res);
        this.setState({ Response: res });
        this.setState({ ShowResponse: true });
        this.setState({ LocationValue: "" });
        this.setState({ QuestionValue: "" });
      })
      .catch(e => console.log(e));
  }

  makeSpacesRequest() {
    const coords = new Coordinates();
    const req = new SearchSpaceByNameRequest();
    coords.setLatitude(36);
    coords.setLongitude(-78);
    req.setCoordinates(coords);
    req.setIsValidCoordinates(true);
    var queryString = this.state.LocationValue;
    console.log("printing out query string");
    console.log(queryString);
    req.setQueryString(queryString);
    return req;
  }
  fetchSpaces() {
    console.log("=========================");
    console.log(this.state.LocationValue);
    console.log(this.state.QuestionValue);
    if (this.state.LocationValue == "") {
      return;
    }
    fetch("https://apollo.ourspace.dev/search", {
      method: "post",
      body: this.makeSpacesRequest().serializeBinary()
    })
      .then(res => res.arrayBuffer())
      .then(buf => SearchSpaceByNameResponse.deserializeBinary(buf))
      .then(response => response.getResultsList())
      .then(SpacesList => {
        // list of Spaces
        this.setState({ SpacesList: SpacesList });
      });
  }

  render() {
    const { SpacesList } = this.state;
    const SpacesNames = SpacesList.map(space => space.getName());

    //cannot press ask if no locations come up in search or if question/location is empty.
    const searchIncorrect = this.state.SpacesList.length == 0;
    const emptyLocation = this.state.LocationValue.length == 0;
    const emptyQuestion = this.state.QuestionValue.length == 0;
    const notExactMatch = !SpacesNames.map(spaceName =>
      spaceName.toLowerCase()
    ).includes(this.state.LocationValue.toLowerCase());
    let errorMessage;
    if (searchIncorrect) {
      errorMessage = (
        <p>
          Sorry, your search doesn't match any locations. Change your search or
          add a location.
        </p>
      );
    } else if (emptyLocation) {
      errorMessage = <p> Please enter a location.</p>;
    } else if (emptyQuestion) {
      errorMessage = <p> Please enter a question.</p>;
    } else if (notExactMatch) {
      errorMessage = (
        <p>
          {" "}
          Your search returns results but it is not an exact match. Please
          complete the string.
        </p>
      );
    } else {
      errorMessage = null;
    }
    return (
      <div>
        <div class="overlay" id="question-overlay">
          <OutsideAlerter>
            {this.state.ShowResponse && (
              <AddQuestionResponseDisplay
                onClick={this.handleCloseResponse}
                response={this.state.Response}
              />
            )}
            <form class="question-overlay-form">
              <Grid container className="question-overlay-grid" spacing={0}>
                <Grid item xs={1}>
                  <label>Location:</label>
                </Grid>
                <Grid item xs={12}>
                  <IntegrationDownshift
                    suggestions={SpacesNames}
                    input={this.state.LocationValue}
                    onChange={this.handleChange("LocationValue")}
                    onDropdownChange={this.handleDropdownLocationChange}
                  />
                </Grid>
                <Grid item xs={1}>
                  <label>Question:</label>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="question"
                    margin="normal"
                    placeholder="i.e. How busy is Il Forno?"
                    fullWidth
                    value={this.state.QuestionValue}
                    onChange={this.handleChange("QuestionValue")}
                  />
                </Grid>
                <Grid item xs={12} className="question-overlay-ask-button">
                  <Button
                    variant="contained"
                    color="default"
                    disabled={
                      searchIncorrect ||
                      emptyLocation ||
                      emptyQuestion ||
                      notExactMatch
                    }
                    onClick={this.askQuestion}
                  >
                    Ask
                  </Button>
                  {errorMessage}
                </Grid>
              </Grid>
            </form>
          </OutsideAlerter>
        </div>
        <div class="gray-overlay" id="question-gray-overlay"></div>
      </div>
    );
  }
}

export default QuestionOverlay;
