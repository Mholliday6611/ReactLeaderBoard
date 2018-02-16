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
		this.getPoints = this.getPoints.bind(this)
	}
	componentDidMount(){
		this.updateInfo()
	}
	componentWillReceiveProps(){
		this.updateInfo()
	}
	updateInfo(){
		leaderApi.getTeacher(this.props.teachers)
			.then(response => this.setState({teachers:response.data}))

		leaderApi.getStudents(this.props.params.id)
			.then(response => {this.setState({students:response.data})})
			.then(result => this.getPoints())
			.catch(err=>console.log(err))
	}
	getPoints(){
		console.log("start")
		var points = []
		for(var i=0; i < this.state.students.length; i++){
			console.log(this.state.students)
			leaderApi.getPoints(this.state.students[i]._id, this.props.tasks)
				.then(response=> {
					points.push(response.data)
				} )
				.then(result => {
					var newStudents = this.state.students.map(i=>{
						for(var j=0; j<this.state.students.length; j++){
							console.log(points)
							if(i._id == points[j].id){
								i.points = points[j].points
								return i
							}
						}
					})

					newStudents.sort(function(a,b){
						return b.points - a.points
					})
					this.setState({
						students: newStudents
					})
				})
				.catch(err => console.log(err))
		}
	}

	render(){
		console.log(this.state)
		console.log(this.props)
		var teachers = this.state.teachers.map(i=> <li>{i.email}</li>)
		var students = this.state.students.map(i => <tr><Link to={"/profile/" + i._id}><td>{i.email}{i.first_name}{i.last_name}</td></Link><td>{i.points}</td></tr>)
		return(
			<div>
				<center>
				<h1 className="title">{this.props.name}</h1>
				<p>{this.props.description}</p>
				</center>
				{this.props.type === "teacher" || this.props.type === "admin" &&
				<div style={{textAlign:"center"}} className="columns">
					<div className="column">
					<Link to={`/class/taskmanager/${this.props.id}`}><h1>TASK MANAGER</h1></Link>
					</div>
					<div className="column">
					<Link to={`/class/attendance/${this.props.id}`}><h1>ATTENDANCE MANAGER</h1></Link>
					</div>
				</div>
				}
				<h3>Teachers</h3>
				<ul>
					{teachers}
				</ul>
				<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					<tbody>
					<tr>
						<th>Student</th>
						<th>Points</th>
					</tr>
					{students}
					</tbody>
				</table>
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
		this.setState({
			type: localStorage.getItem("type")
		})
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
		 console.log(this.state)
		if(this.state.info != ""){
			var display = <ClassDisplay type={this.state.type} name={this.state.info.name} tasks={this.state.info.tasks.join()} description={this.state.info.description} teachers={this.state.info.teachers.join()} id={this.props.match.params.id} params={this.props.match.params}/>
		}
		return(
				<div>
					{display}
					{this.state.type === "teacher" || this.state.type === "admin" &&
					<AddStudent id={this.props.match.params.id} up={this.getClass} />
					}
					
				</div>
			)
	}
}

export default ClassDashboard