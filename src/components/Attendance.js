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
		})
		.catch()
	}

	render(){
		return(	
				<div>
					<h1>Create Attendance</h1>
					<form onSubmit="handleSubmit">
						<input type="date" name="date" onChange="handleChange" />
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
	}

	render(){
		return(
				<div>
					<table>

					</table>
				</div>
			)
	}
}
class Attendance extends Component {
 	constructor(){
 		super()

 		this.state = {
 			isOpen : false
 		}
 		this.updateState = this.updateState.bind(this)
 		this.openModal = this.openModal.bind(this)
 		this.closeModal = this.closeModal.bind(this)
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

 	openModal(){
	    this.setState({isOpen: true});
	  }
	 closeModal() {
	    this.setState({isOpen: false});
	  }

 	// leaderApi.markAttendance
 	// leaderApi.createAttendance

 	render(){
 		console.log(this.state)
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
			 						<select>
			 							<option>Test</option>
			 						</select>
			 					</div>
			 				</div>
		 					<div>
		 						TABLE HERE
		 					</div>

		 					<Modal
		 						isOpen={this.state.isOpen} 
								onRequestClose={this.closeModal}
								style={{
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
	 							<SubmitAttendance id={this.props.match.params.id} up={this.updateState} />
	 						</Modal>
	 					</div>

	 					
 					}

 					

 				</div>
 		)
 	}
 }

 export default Attendance