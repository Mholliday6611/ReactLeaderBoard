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
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("type", response.data.type);
			if(response.data.type === "teacher"){
				this.setState({
					teacher:true
				})
			}else if(response.data.type === "student"){

			}else if(response.data.type === "admin"){
				this.setState({
					admin:true
				})
			}
		})
		.catch()
	}

	render(){
		if(this.state.admin){
			return(<Redirect to="/admindashboard"/>)
		}
		if(this.state.teacher){
			return(<Redirect to="/teacherdashboard"/>)
		}
		return(
			<div className="section columns">
				<form className="column is-half is-offset-one-quarter" onSubmit={this.handleSubmit}>
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
						<center><input className="button is-right" type="submit" /></center>
				</form>
			</div>
			)
	}
}
export default Home