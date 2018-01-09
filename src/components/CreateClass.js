import React, { Component } from "react"
import leaderApi from "../utils/api"

class CreateClass extends Component {
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
		leaderApi.createClass({
			name : this.state.name,
			description : this.state.description,
			start : this.state.start,
			end : this.state.end
		})
		.then(function(response){
			
		})
		.catch()
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input placeholder="name" name="name"  onChange={this.handleChange}/>
					<input placeholder="description" name="description"  onChange={this.handleChange}/>
					<input placeholder="start" name="start" type="date"  onChange={this.handleChange}/>
					<input placeholder="end" name="end" type="date"  onChange={this.handleChange}/>
					<input type="submit" />
				</form>
			</div>
			)
	}
}

export default CreateClass