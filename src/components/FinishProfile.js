import React, {Component} from 'react'
import leaderApi from "../utils/api"

class Finish extends Component {
	constructor(){
		super()

		this.state={
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
		leaderApi.finish({
			first_name : this.state.first_name,
			last_name : this.state.last_name,
			bio : this.state.bio,
			github : this.state.github,
			linkedin : this.state.linkedin,
			password : this.state.password,
		},
		this.props.id)
		.then()
		.catch()
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input placeholder="First Name" name="first_name"  onChange={this.handleChange}/>
					<input placeholder="Last_Name" name="last_name"  onChange={this.handleChange}/>
					<input placeholder="password" type="password" name="password"  onChange={this.handleChange}/>
					<input placeholder="bio" name="bio"  onChange={this.handleChange}/>
					<input placeholder="github" name="github"  onChange={this.handleChange}/>
					<input placeholder="linkedin" name="linkedin"  onChange={this.handleChange}/>
					<input type="submit" />
				</form>
			</div>
			)
	}
}