import React, {Component} from 'react'
import leaderApi from "../utils/api"
import {Redirect} from "react-router-dom"

class Home extends Component {

	constructor(){
		super()

		this.state={
			email: '',
			password: '',
			admin:false,
			teacher:false,
			student:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleStudentSubmit = this.handleStudentSubmit.bind(this)
	}

	handleChange(event){
		var value = event.target.value
		var name = event.target.name

		this.setState({
			[name]: value
		})
	}

	handleSubmit(event){
		event.preventDefault();
		leaderApi.login({
			email : this.state.email,
			password : this.state.password
		})
		.then(response =>{
			console.log(response)
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("type", response.data.type);
			if(response.data.type === "teacher"){
				this.setState({
					teacher:true
				})
			}else if(response.data.type === "admin"){
				this.setState({
					admin:true
				})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	handleStudentSubmit(event){
		event.preventDefault();
		leaderApi.studentLogin({
			email : this.state.email,
			password : this.state.password
		})
		.then(response =>{
			console.log(response)
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("type", response.data.type);
			if(response.data.type === "student"){
				this.setState({
					student:true
				})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}

	render(){
		if(this.state.admin){
			return(<Redirect to="/admindashboard"/>)
		}
		if(this.state.teacher || this.state.student){
			return(<Redirect to="/dashboard"/>)
		}
		return(
			<div id="homebg" className="section columns">
				<form id="loginForm"className="column is-half is-offset-one-quarter">
					<div className="field">
						<div className="control">
							<input placeholder="Email" name="email" className="input is-medium"  onChange={this.handleChange}/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input placeholder="Password" className="input is-medium" type="password" name="password" onChange={this.handleChange}/>
						</div>
					</div>
						<center>
						<button className="button login is-right" onClick={this.handleSubmit}>Teacher Login </button>

						<button className="button login is-left" onClick={this.handleStudentSubmit}> Student Login </button>
						</center>
				</form>
			</div>
			)
	}
}
export default Home