import React, {Component} from 'react'
import leaderApi from "../utils/api"
import { Link } from "react-router-dom"

function ClassDisplay(props){
	return(
			<div className="box classDesc radius-is-small">
				<strong><Link to={`/class/${props.id}`}>{props.name}</Link></strong>
				<p>{props.description}</p>
				{props.teachers}
			</div>
		)
}


class Dashboard extends Component {
	constructor(){
		super();
		this.state = {
			classes: [],
			students:[],
			done:false
		}
		this.getPoints = this.getPoints.bind(this)
		this.updateState = this.updateState.bind(this)
	}

	componentDidMount(){
		this.updateState()
	}
	componentWillReceiveProps(){
		this.updateState()
	}

	updateState(){
		leaderApi.getDash()
		.then((response) => this.setState({classes: response.data}))
		.catch()

		leaderApi.getAllStudents()
		.then(response => this.setState({students: response.data}))
		.then(result => this.getPoints())
		.catch(err=>console.log(err))
	}
	getPoints(){
		var points = []
		var promises = []
		for(var i=0; i <this.state.students.length; i++){
			promises.push(leaderApi.getPoints(this.state.students[i]._id, "all"))
		}
		Promise.all(promises)
			.then(result => {
				var newStudents = result.map((i)=>{
					for(var j=0; j<this.state.students.length; j++){
						if(this.state.students[j]._id == i.data.id){
							var x = this.state.students
							x[j].points = i.data.points;
							return x[j]
						}
					}
				})
				newStudents.sort(function(a,b){
					return b.points - a.points
				})
				this.setState({students:newStudents,done: true})
			})
	}
	render(){
		const classDisplay = this.state.classes.map((item, index) =><ClassDisplay name={item.name} description={item.description} id={item._id} teachers={item.teachers.name}/>)

		var students =  this.state.students.map(i=>
				<tr>
					<td>{i.email}</td>
					<td>{i.points}</td>
				</tr>
			
		)
		console.log(students)
		return(
				<div>
				{classDisplay}
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

export default Dashboard