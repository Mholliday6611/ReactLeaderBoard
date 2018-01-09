import React, { Component } from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home"
import ADashboard from "./ADashboard"
import TDashboard from "./TDashboard"
import ClassDashboard from "./ClassDashboard"
import Profile from "./profile"
import Register from "./register"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/admindashboard' component={ADashboard} />
            <Route exact path='/teacherdashboard' component={TDashboard} />
            <Route path='/class/:id' component={ClassDashboard} />
            <Route path='/profile/:name' component={Profile} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
