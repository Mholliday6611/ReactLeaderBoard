import React, {Component} from 'react'
import leaderApi from "../utils/api"


function ClassDisplay(props){
	return(
			<div>
				{props.name}
				{props.description}
				{props.teachers}
			</div>
		)
}

class TDashboard extends Component {
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
		const classDisplay = this.state.classes.map((item, index) =><ClassDisplay name={item.name} description={item.description} teachers={item.teachers.name} />)
		return(
				<div>
				{classDisplay}
				</div>
			)
	}
}

export default TDashboard