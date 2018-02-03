import React, { Component } from 'react';
import leaderApi from "../utils/api"
import Modal from 'react-modal';

 
class SubmitAttendance extends Component {
	constructor(){
		super()

		this.state = {

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
		leaderApi.createAttendance({
			date : this.state.date,
		}, this.props.id)
		.then(response => {
			this.props.up()
			this.props.close()
		})
		.catch()
	}

	render(){console.log(this.state)
		return(	
				<div>
					<h1>Create Attendance</h1>
					<form onSubmit={this.handleSubmit}>
						<input type="date" name="date" onChange={this.handleChange} />
						<input type="submit" />
					</form>
				</div>
			)
	}
}

class AttendanceTable extends Component {
	constructor(){
		super()

		this.state = {

		}
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event){
		var value = event.target.value
		var name = event.target.name

		this.setState({
			[name]: value
		})
	}
	markAttendance(event, studentId){
		event.preventDefault()
		leaderApi.markAttendance({status: this.state[studentId]},studentId,this.props.attendId,this.props.classId)
		.then(response =>{
			console.log(response.data)
		})
	}
	render(){
		console.log(this.state)
		var students = this.props.students.map(i => <tr><td>{i.email}</td><td>
			<form id={i._id} onSubmit={(event)=>this.markAttendance(event, i._id)}> 
			  <input type="radio" name={i._id} value="here" onChange={this.handleChange} /> Here 
			  <input type="radio" name={i._id} value="Absent_wExcuse" onChange={this.handleChange}  /> Absent w/ excuse 
			  <input type="radio" name={i._id} value="Absent_noExcuse" onChange={this.handleChange}  />Absent 
			  <input type="radio" name={i._id} value="Late_wExcuse" onChange={this.handleChange}  />Late 
			  <input type="radio" name={i._id} value="Late_noExcuse"onChange={this.handleChange}   /> Late w/ excuse 
			  <input type="submit" />
			</form> 
		</td></tr>)
		return(
				<div>
					<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
						<tr>
							<th>
								Students
							</th>
							<th>
								Actions
							</th>
						</tr>
							{students}
					</table>
				</div>
			)
	}
}
class Attendance extends Component {
 	constructor(){
 		super()

 		this.state = {
 			isOpen : false,
 			students: []
 		}
 		this.updateState = this.updateState.bind(this)
 		this.openModal = this.openModal.bind(this)
 		this.closeModal = this.closeModal.bind(this)
 		this.handleChange = this.handleChange.bind(this)
 	}

 	componentDidMount(){
 		this.updateState()
 	}
 	updateState(){
 		leaderApi.viewClass(this.props.match.params.id)
 			.then(response =>{
 				this.setState({
 					class: response.data
 				})
 			})
 			.catch()

 		leaderApi.getStudents(this.props.match.params.id)
 			.then(response =>{
 				this.setState({
 					students: response.data
 				})
 			})
 			.catch()

 		leaderApi.getAttendance(this.props.match.params.id)
 			.then(response =>{
 				this.setState({
 					attendance : response.data
 				})
 			})
 	}
 	handleChange(event){
 		var value = event.target.value
		var name = event.target.name

		this.setState({
			[name]: value
		})
 	}

 	openModal(){
	    this.setState({isOpen: true});
	  }
	 closeModal() {
	    this.setState({isOpen: false});
	  }

 	// leaderApi.markAttendance
 	// leaderApi.createAttendance

 	render(){
 		return(
 				
 				<div>
 					{
 						this.state.class === undefined? 

 						<div><h1>Loading...</h1></div>

 						: 
 						<div>
	 						<div>
	 							<h1> {this.state.class.name}</h1>
		 					</div>

		 					<div className="columns"> 
		 						<div className="column">
			 						<h1><button onClick={this.openModal}> CreateAttendance + </button> </h1>
			 					</div>
			 					<div className="column">
			 						<select name="currentAttendance" onChange={this.handleChange}>
			 							<option>SELECT A DATE</option>
			 							{this.state.attendance !== undefined ? 
			 								this.state.attendance.map(i => <option value={i._id}>{i.dateOfClass}</option>) :
			 								<option></option> }
			 						</select>
			 					</div>
			 				</div>
		 					<div>
	 							{this.state.attendance !== undefined ?
		 						<AttendanceTable date={this.state.attendance._id} attendId={this.state.currentAttendance} classId={this.props.match.params.id} students={this.state.students} /> :
	 							<div></div>}
		 					</div>

		 					<Modal
		 						isOpen={this.state.isOpen} 
								onRequestClose={this.closeModal}
								style={{
									overlay: {
										      position: 'fixed',
										      top: 0,
										      left: 0,
										      right: 0,
										      bottom: 0,
										      backgroundColor: 'rgba(255, 255, 255, 0.75)'
										    },
									content: {
										      position: 'absolute',
										      top: '40px',
										      left: '40px',
										      right: '40px',
										      bottom: '40px',
										      border: '1px solid #ccc',
										      background: '#fff',
										      overflow: 'auto',
										      WebkitOverflowScrolling: 'touch',
										      borderRadius: '4px',
										      outline: 'none',
										      padding: '20px'
										    }
								}}

		 					>
	 							<SubmitAttendance id={this.props.match.params.id} up={this.updateState} close={this.closeModal} />
	 						</Modal>
	 					</div>

	 					
 					}

 				</div>
 		)
 	}
 }

 export default Attendance