import React, {Component} from "react";
import {SubNavBar} from "./SubNavBar";
import {Route, Router, Switch} from "react-router-dom";
import Recent from "./Tabs/Recent";
import SearchByDate from "./Tabs/SearchByDate";
import SearchByLocation from "./Tabs/SearchByLocation";
import SearchByUser from "./Tabs/SearchByUser";
import Mapv2 from "../MapComponentv2";
import createHistory from "history/createBrowserHistory";
import "../../App.css";
import QuestionOverlay from "./QuestionOverlay";
import OpenQuestionOverlay from "./OpenQuestionOverlay";
import {ButtonGroup, Col, Row} from "reactstrap";
import Button from "@material-ui/core/Button";
import equal from "fast-deep-equal";
// Import APIs
import * as apis from "../../proto/apis_pb";

const {
  GetAllQuestionsRequest,
    GetAllQuestionsResponse,
  Coordinates
} = apis;
// Contains the SubNavbar and displays all of the tabs

const history = createHistory();

function isEquivalent(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (!equal(a[propName], b[propName])) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}
let x = 0;

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QList: []
    };
    this.shouldUpdate = false;
  }

  makeRequest() {
    // QUESTIONS
    const req2 = new GetAllQuestionsRequest();

    return req2;
  }
  fetchQuestions() {
    fetch("https://zoro.ourspace.dev/admin/get_all_questions", {
      method: "post",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_ZORO_KEY
      },
       body: this.makeRequest().serializeBinary()
    })
      .then(res => res.arrayBuffer())
      .then(buf => GetAllQuestionsResponse().deserializeBinary(buf))
      .then(response => response.getCustomQuestionsList())
      .then(QList => {
        console.log("HIT");
        this.setState({ QList: QList });
      });
  }
  shouldComponentUpdate(nextProps, nextState, nextContent) {
    // return isEquivalent(
    //         JSON.stringify(this.state.QList),
    //         JSON.stringify(nextState.QList)
    //     );
    x = x+1;
    return x<5;



  }

  componentDidMount() {
    x = 0;
    this.fetchQuestions();
    //this.timer = setInterval(() => this.fetchQuestions(), 1000000000); //Fetches data every 5 seconds
  }

  componentWillUnmount() {
   // clearInterval(this.timer);
   // this.timer = null;
  }


  render() {
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
            <Mapv2 QList={this.state.QList} spaceData={[]} />{" "}
          </Col>
          <Col className="right-container" style={{ height: "92vh" }} xs={6}>
            <QuestionOverlay />
            <Router history={history}>
              {/*<span onclick="alert('click')" style = {{marginLeft:"1.5rem"}}> Add Question <img src = {plus} alt={"NA"} /></span>*/}
              <SubNavBar />
              <ButtonGroup>
                <OpenQuestionOverlay />
                <Button  variant= "contained" color="default" onClick={this.fetchQuestions()} >Refresh</Button>
              </ButtonGroup>
              <Switch>
                <Route
                  path="/questions/recent"
                  render={props => (
                    <Recent {...props} QList={this.state.QList} />
                  )}
                />
                <Route
                  path="/questions/user"
                  render={props => (
                    <SearchByUser {...props} QList={this.state.QList} />
                  )}
                />
                <Route
                  path="/questions/date"
                  render={props => (
                    <SearchByDate {...props} QList={this.state.QList} />
                  )}
                />
                <Route
                  path="/questions/location"
                  render={props => (
                    <SearchByLocation {...props} QList={this.state.QList} />
                  )}
                />
              </Switch>
            </Router>
          </Col>
        </Row>
      </div>
    );
  }
}

export default QuestionContainer;
