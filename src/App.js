import React, { Component } from "react";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import QuestionContainer from "./Components/QuestionsTab/QuestionContainer";
import SpacesTab from "./Components/SpacesTab/SpacesTab";
import TransactionsContainer from "./Components/TransactionsTab/TransactionsContainer";
import UsersContainer from "./Components/UsersTab/UsersContainer";
import createHistory from "history/createBrowserHistory";

const history = createHistory();


class App extends Component {
  constructor(props) {
      super(props); //This calls the consttructor of components
      this.state = {};
  }


  render(){
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          margin: "5 0"
        }}
      >
        <Router history={history}>
            <NavBar style={{ height: "8vh" }} />
          <Switch>
            {/*<Col style = {{height:"92vh"}} xs={6}>*/}
            {/*  {" "}*/}
            {/*  <Mapv2 />{" "}*/}
            {/*</Col>*/}
            <div
              style={{
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                margin: "5 0"
              }}
            >
              <Route path="/questions" component={QuestionContainer} />
              <Route path="/spaces" component={SpacesTab} />
              <Route path="/transactions" component={TransactionsContainer} />
              <Route path="/users" component={UsersContainer} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
