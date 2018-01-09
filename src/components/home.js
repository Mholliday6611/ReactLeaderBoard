import React, {Component} from 'react'
import leaderApi from "../utils/api"

class Home extends Component {

	constructor(){
		super()

		this.state={
			email: '',
			password: ''
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
		.then(function(response){
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("type", response.data.type)
		})
		.catch()
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input placeholder="Email" name="email"  onChange={this.handleChange}/>
					<input placeholder="Password" type="password" name="password" onChange={this.handleChange}/>
					<input type="submit" />
				</form>
			</div>
			)
	}
}
export default Home