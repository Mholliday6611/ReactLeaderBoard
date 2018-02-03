import React, {Component} from 'react'
import leaderApi from "../utils/api"
import AddStudent from "./AddStudent"
import { Link } from "react-router-dom"

class ClassDisplay extends Component{
	constructor(){
		super()
		this.state = {
			teachers: [],
			students: []
		}
		this.updateInfo = this.updateInfo.bind(this)
	}
	componentDidMount(){
		this.updateInfo()
	}
	updateInfo(){
		leaderApi.getTeacher(this.props.teachers)
			.then(response => this.setState({teachers:response.data}))

		leaderApi.getStudents(this.props.params.id)
			.then(response => this.setState({students:response.data}) )
			.catch(err=>console.log(err))
		
	}
	render(){
		var teachers = this.state.teachers.map(i=> <li>{i.email}</li>)
		var students = this.state.students.map(i => <li>{i.email}{i.first_name}{i.last_name}</li>)
		return(
			<div>
				<h1>{this.props.name}</h1>
				<p>{this.props.description}</p>
				<Link to={`/class/taskmanager/${this.props.id}`}><h1>TASK MANAGER</h1></Link>
				<h3>Teachers</h3>
				<ul>
					{teachers}
				</ul>
				<h3>Students</h3>
				<ul>
					{students}
				</ul>
			</div>
		)
	}
	
}

class ClassDashboard extends Component {
	constructor(){
		super();
		this.state ={
			info: ""
		}
		this.getClass = this.getClass.bind(this)
	}
	componentDidMount(props){
		this.getClass()
	}
	getClass(){
		leaderApi.viewClass(this.props.match.params.id)
		.then(info => {
			this.setState({
				info: info.data
			})
		})
	}
	render(){
		var display = <ClassDisplay name={this.state.info.name} description={this.state.info.description} teachers={this.state.info.teachers} id={this.props.match.params.id} params={this.props.match.params}/>
		return(
				<div>
					{display}
					<AddStudent id={this.props.match.params.id} up={this.getClass} />
				</div>
			)
	}
}

export default ClassDashboard