import React, {Component} from 'react'
import leaderApi from "../utils/api"
import Modal from 'react-modal';

class SubmitTask extends Component {
	constructor(){
		super()

		this.state = {
			open:false,
			submitted:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.openModal = this.openModal.bind(this)
	}

	componentDidMount(){
		leaderApi.getYourSubmittedTask(this.props.taskId)
		.then(response =>{
			if(response.data.length != 0){
				console.log(response.data)
				this.setState({
					submitted: true,
					submittedTask: response.data[0].info
				})
			}
		})
	}
	handleSubmit(e){
		e.preventDefault()
		leaderApi.submitTask({info: this.state.task},this.props.taskId)
		.then(response => {
			this.openModal()
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
		if(this.state.open){
			this.setState({
				open:false
			})
		}else{
			this.setState({
				open: true
			})
		}
	}
	render(){
		return(
			<div className="card-footer">

				<a className="card-footer-item" onClick={this.openModal}>Submit Task</a>

				{this.state.submitted? <a className="card-footer-item">Submitted!</a> : <a className="card-footer-item">Not Done</a>}

				<Modal
					  isOpen={this.state.open}
					  onRequestClose={this.openModal}
					  contentLabel="Modal"
					  style={{content:{maxWidth: "400px",maxHeight:"300px",transform: 'translate(50%, 50%)'}}}
					>
					<h1>Enter HW Here</h1>
					{this.state.submitted? <p>{this.state.submittedTask}</p> : <p></p>}
					<br/>
					<form onSubmit={this.handleSubmit}>
						<label>HomeWork</label>
						<input type="text" name="task" onChange={this.handleChange}/>
						<input type="submit"/>
					</form>
				</Modal>
			</div>
			)
	}
}
class StudentTask extends Component {
	constructor(){
		super()

		this.state = {
			tasks:[]
		}
	}

	componentDidMount(){
		leaderApi.getClassTask(this.props.match.params.id)
			.then(response => this.setState({tasks:response.data}))
	}

	render(){
		var tasks = this.state.tasks.map(i => 
			<div style={{marginTop: "30px",marginLeft:"50px",maxWidth:"500px"}} className="card">
				<header className="card-header">
					<p className="card-header-title">
					{i.name}
					</p>
				</header>
				<div className="card-content">	
					<div className="content">
						{i.description}
					</div>
				</div>
				<footer>
					<SubmitTask taskId={i._id}/>
				</footer>
			</div>)
		return(
				<div>
					{tasks}
				</div>
			)
	}
}

export default StudentTask