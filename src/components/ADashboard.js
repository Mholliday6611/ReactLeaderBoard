import React, {Component} from 'react'
import leaderApi from "../utils/api" 
import AddTeacher from "./AddTeacher"
import { Link } from "react-router-dom"

class ClassDisplay extends Component{
	constructor(){
		super()
		this.state = {
			teachers: []
		}
		this.updateTeachers = this.updateTeachers.bind(this)
	}
	componentDidMount(){
		this.updateTeachers()
		
	}
	updateTeachers(){
		this.props.up()
		leaderApi.getTeacher(this.props.teachers)
			.then(response => this.setState({teachers:response.data}))
	}
	render(){
		console.log(this.state)
		var teachers = this.state.teachers.map(i=> i.email)
		return(
			<div>
				<Link to={`/class/${this.props.id}`}>{this.props.name}</Link>
				{this.props.description}
				{teachers}
				<AddTeacher id={this.props.id} up={this.updateTeachers} />
			</div>
		)
	}
	
}

class Submit extends Component {
	constructor(){
		super()
		this.state = {

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
		.then(response =>{
			this.props.up()
		})
	}

	render(){
		console.log(this.props)
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

class ADashboard extends Component {
	constructor(){
		super();
		this.state = {
			classes: [],
			visible: false
		}
		this.visibleTrue = this.visibleTrue.bind(this)
		this.updateClasses = this.updateClasses.bind(this)
	}
	componentDidMount(){
		this.updateClasses()
	}
	updateClasses(){
		leaderApi.getAdminDash()
			.then((response) => this.setState({classes: response.data}))
	}
	visibleTrue(){
		if(this.state.visible === false){
			this.setState({
				visible: true
			})
			this.updateClasses()
		}else{
			this.setState({
				visible: false
			})
			this.updateClasses()
		}
		
	}

	render(){
		
		if(this.state.classes === "NOT ALLOWED"){
			var classDisplay = "Not Allowed"
		}else{
			console.log(this.state)
		var classDisplay = this.state.classes.map((item, index) =><ClassDisplay name={item.name} description={item.description} id={item._id} teachers={item.teachers} up={this.updateClasses}/>)
		}
		return(
				<div>
					{classDisplay}
					<button onClick={this.visibleTrue}>make class</button>
					{!this.state.visible ?
						<div></div>
				:
				<div>
					<Submit up={this.updateClasses}/>
				</div>}
				</div>
			)
	}
}

export default ADashboard