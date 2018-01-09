import React, { Component } from "react"
import leaderApi from "../utils/api"

class AddStudent extends Component {
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
		leaderApi.addStudent({
			email : this.state.email,
		},
		this.props.id)
		.then()
		.catch()
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input placeholder="Email" name="email"  onChange={this.handleChange}/>
					<input type="submit" />
				</form>
			</div>
			)
	}
}

export default AddStudent