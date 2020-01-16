import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './Components/PrivateRoute';
import  App  from './App';
import { LoginPage } from './Login';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class MainApp extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={App} />
                    <div className="jumbotron">
                        <div className="container">
                            <div className="col-sm-8 col-sm-offset-2">
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </Switch>
            </Router>

        );
    }
}

export default  MainApp ;