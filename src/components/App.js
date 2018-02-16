import React, { Component } from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home"
import ADashboard from "./ADashboard"
import Dashboard from "./Dashboard"
import ClassDashboard from "./ClassDashboard"
import StudentTask from "./StudentTask"

import Profile from "./Profile"
import FinishTeacher from "./FinishTeacher"
import FinishStudent from "./FinishStudent"

import TaskManager from "./TaskManager"
import Attendance from "./Attendance"
import Nav from "./Nav"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/admindashboard' component={ADashboard} />
            <Route exact path='/dashboard' component={Dashboard} /> 

            <Route exact path='/class/:id' component={ClassDashboard} />
            <Route exact path="/class/task/:id" component={StudentTask} />

            <Route exact path="/class/taskmanager/:id" component={TaskManager} />
            <Route exact path="/class/attendance/:id" component={Attendance} />

            <Route path='/profile/:id' component={Profile} />

            <Route path="/finishT/:id" component={FinishTeacher} />
            <Route path="/finishS/:id" component={FinishStudent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
