import React, {Component} from 'react'
import leaderApi from "../utils/api"
import { Link } from "react-router-dom"

function ClassDisplay(props){
	console.log(props)
	return(
			<div>
				<Link to={`/class/${props.id}`}>{props.name}</Link>
				{props.description}
				{props.teachers}
			</div>
		)
}

class Dashboard extends Component {
	constructor(){
		super();
		this.state = {
			classes: []
		}
	}
	componentDidMount(){
		leaderApi.getDash()
		.then((response) => this.setState({classes: response.data}))
		.catch()
	}

	render(){
		console.log(this.state)
		const classDisplay = this.state.classes.map((item, index) =><ClassDisplay name={item.name} description={item.description} id={item._id} teachers={item.teachers.name} />)
		return(
				<div>
				{classDisplay}
				</div>
			)
	}
}

export default Dashboard