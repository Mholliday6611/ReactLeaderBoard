import React, { Component } from "react"
import leaderApi from "../utils/api"

class AddTeacher extends Component {
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
		leaderApi.addTeacher({
			email : this.state.email,
			value: ""
		},
		this.props.id)
		.then(response=> {
			this.props.up()
		} )
		.catch()
	}

	render(){
		console.log(this.props)
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

export default AddTeacher