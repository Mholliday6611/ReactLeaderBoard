import React, { Component } from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home"
import ADashboard from "./ADashboard"
import TDashboard from "./TDashboard"
import ClassDashboard from "./ClassDashboard"
import SDashboard from "./SDashboard"
import Profile from "./StudentProfile"
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
            <Route exact path='/teacherdashboard' component={TDashboard} />
            <Route exact path='/studentdashboard' component={SDashboard} />
             {/* 
            <Route exact path='/studentdashboard' component={SDashboard} />
              */}
            <Route exact path='/class/:id' component={ClassDashboard} />
            <Route exact path="/class/taskmanager/:id" component={TaskManager} />
            <Route exact path="/class/attendance/:id" component={Attendance} />

            <Route path='/profile/:name' component={Profile} />
            <Route path="/finishT/:id" component={FinishTeacher} />
            <Route path="/finishS/:id" component={FinishStudent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
