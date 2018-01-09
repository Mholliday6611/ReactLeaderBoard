import React, {Component} from 'react'
import leaderApi from "../utils/api" 
import CreateClass from "./CreateClass"
import AddTeacher from "./AddTeacher"
import { Link } from "react-router-dom"

class ClassDisplay extends Component{
	constructor(){
		super()
		this.state = {
			teachers: []
		}
	}
	componentDidMount(){
		console.log(this.props.teachers)
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
				<AddTeacher id={this.props.id}/>
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
		.catch()
	}
	visibleTrue(){
		if(this.state.visible == false){
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
		console.log(this.state)
		const classDisplay = this.state.classes.map((item, index) =><ClassDisplay name={item.name} description={item.description} id={item._id} teachers={item.teachers}/>)
		return(
				<div>
					{classDisplay}
					<button onClick={this.visibleTrue}>make class</button>
					{!this.state.visible ?
						<div></div>
				:
				<div>
					<CreateClass />
				</div>}
				</div>
			)
	}
}

export default ADashboard