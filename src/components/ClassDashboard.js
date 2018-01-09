import React, {Component} from 'react'
import leaderApi from "../utils/api"
import AddStudent from "./AddStudent"

class ClassDisplay extends Component{
	constructor(){
		super()
		this.state = {
			teachers: [],
			students: []
		}
	}
	componentDidMount(){
		console.log(this.props)
		leaderApi.getTeacher(this.props.teachers)
			.then(response => this.setState({teachers:response.data}))
		
	}
	render(){
		console.log(this.state)
		var teachers = this.state.teachers.map(i=> <li>{i.email}</li>)
		return(
			<div>
				<h1>{this.props.name}</h1>
				<p>{this.props.description}</p>
				<h3>Teachers</h3>
				<ul>
					{teachers}
				</ul>
				<h3>Students</h3>
				<ul>
					{this.state.students}
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
	}
	componentDidMount(props){
		leaderApi.viewClass(this.props.match.params.id)
		.then(info => {
			this.setState({
				info: info.data
			})
		})
	}

	addStudent(){
		leaderApi.addStudent()
	}

	render(){
		if(this.state.info != ""){
			var display = <ClassDisplay name={this.state.info.name} description={this.state.info.description} teachers={this.state.info.teachers} />
		}
		if(localStorage.getItem("type") == "teacher")
		console.log(this.state.info.teachers)
		return(
				<div>
					{display}
					<AddStudent id={this.props.match.params.id}/>
				</div>
			)
	}
}

export default ClassDashboard