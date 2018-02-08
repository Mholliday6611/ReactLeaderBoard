import React, {Component} from 'react'
import Modal from 'react-modal';
import leaderApi from "../utils/api" 

class Comp extends Component {
	constructor(){
		super()

		this.state= {
			value : ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
	    this.setState({value: event.target.value});
	}
	handleSubmit(id){
		this.props.addTaskToComp(id,this.state.value)
	}

	render(){
		var options = this.props.taskChoices.map(i=> <option value={i._id}>{i.name}</option>)
		var allComps = this.props.compentencies.map(
		i => <li>
				<h1>{i.name}</h1>
				<p>{i.tasks}</p>
				<select value={this.state.value} onChange={this.handleChange}>
					{options}
				</select><button onClick={()=>this.handleSubmit(i._id)}>Add Task to Compentency</button>
			</li>
		)

		return(
				<div>
					<ul>
						{allComps}
					</ul>
				</div>
			)
	}
}

class Task extends Component {

	render(){
		let tasks = ""
		if(this.props.ec==false){
			tasks = this.props.tasks.filter(i => i.extraCredit !== true)
			tasks = tasks.map(
			i=> <tr>
					<td> {i.name}</td>
					<td>{i.description}</td>
					<td>{i.due}</td>
					<td><a style={{marginRight: "10px"}} className="button">Edit</a><a className="button" onClick={()=> this.props.beginGrading(i._id)}>Grade</a></td>	
				</tr>
			)
		}else{
			tasks = this.props.tasks.filter(i => i.extraCredit == true)
			tasks = tasks.map(
			i=> <tr>
					<td> {i.name}</td>
					<td>{i.description}</td>
					<td>{i.due}</td>
					<td><a style={{marginRight: "10px"}} className="button">Edit</a><a className="button" onClick={()=> this.props.beginGrading(i._id)}>Grade</a></td>	
				</tr>
			)
		}
		
		return(
				<div>
					<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
						<tbody>
						<tr>
							<th>Task Name</th>
							<th>Description</th>
							<th>Due Date</th>
							<th>Actions</th>
						</tr>
						{tasks}
						</tbody>
					</table>
				</div>
			)
	}
}

class GradeTask extends Component {
	constructor(){
		super()

		this.state = {

		}
	}

	componentDidMount(){
		leaderApi.getStudents(this.props.params)
			.then(response =>{
				this.setState({
					students: response.data
				})
			}).then(response => {
				var newStudents = this.state.students.map(i=>{
					leaderApi.getSubmittedTask(i._id,this.props.id)
						.then(response => i.submittedTask = response.data)
						return i
				})
			})	
	}
	componentWillReceiveProps(nextProps){
	}

	render(){
		var students = this.state.students.map(i=>{
			<tr>
				<td>{i.email}</td>
				<td>{i.submittedTask.info}</td>
			</tr>
		})
		return(
				<div>
					<table>
						<tr>
							<th>
								Student
							</th>
							<th>
								Submission
							</th>
						</tr>
						{students}
					</table>
				</div>
			)
	}
}

class SubmitTask extends Component{
	constructor(){
		super()
		this.state = {

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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
		leaderApi.createTask({
			name : this.state.name,
			description : this.state.description,
			due : this.state.due,
			points : this.state.points,
			ec: this.props.ec
		},this.props.params)
		.then(response=>{
			this.props.up()
			this.props.close("taskOpen")
			this.props.close("ecOpen")
		})
		.catch()
	}

	render(){
		console.log(this.props)
		return(
				<div> 
					<form onSubmit={this.handleSubmit}>
						<input placeholder="name" name="name"  onChange={this.handleChange}/>
						<input placeholder="due" name="due"  onChange={this.handleChange}/>
						<input placeholder="points" name="points"  onChange={this.handleChange}/>
						<input placeholder="description" name="description"  onChange={this.handleChange}/>
						<input type="submit" /> 
					</form>
				</div>
			)
	}
}

class SubmitComp extends Component{
	constructor(){
		super()
		this.state = {

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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
		leaderApi.createCompentency({
			name : this.state.name,
			description : this.state.description,
			points : this.state.points,
			badge : this.state.badge
		},this.props.params)
		.then(response=>{
			this.props.up()
			this.props.close("compOpen")
		})
	}

	render(){
		return(
				<div> 
					<form onSubmit={this.handleSubmit}>
						<input placeholder="name" name="name"  onChange={this.handleChange}/>
						<input placeholder="points" name="points"  onChange={this.handleChange}/>
						<input placeholder="description" name="description"  onChange={this.handleChange}/>
						<input placeholder="badge" name="badge"  onChange={this.handleChange}/>
						<input type="submit" /> 
					</form>
				</div>
			)
	}
}

class TaskManager extends Component {
	constructor(){
		super()
		this.state = {
			active:"",
			compentencies: [],
			tasks:[],
			submittedTasks: "",
			compOpen: false,
			taskOpen:false,
			gradeTask: false,
			currentlyGrading: "",

			gradeEc: false,
			ecOpen: false,
			compentencyTab: true,
			taskTab: false,
			ExtraCreditTab: false
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.updateTasks = this.updateTasks.bind(this)
		this.updateComps = this.updateComps.bind(this)
		this.addTaskToComp = this.addTaskToComp.bind(this)
		this.beginGrading = this.beginGrading.bind(this)
		this.useTab = this.useTab.bind(this)
	}

	componentDidMount(){
		this.updateTasks()
		this.updateComps()
	}

	addTaskToComp(comp,task){
		leaderApi.addTasktoCompentency(comp,task)
			.then(response =>{
				this.updateComps()
			})
	}

	updateTasks(){
		leaderApi.getClassTask(this.props.match.params.id)
			.then(info => {
			this.setState({
				tasks: info.data
			})
		})
	}
	updateComps(){
		leaderApi.getClassCompentency(this.props.match.params.id)
			.then(info => {
			this.setState({
				compentencies: info.data
			})
		})
	}

	beginGrading(id){
		console.log(id)
		if(this.state.gradeTask){
			this.setState({
				gradeTask: false,
				currentlyGrading:""
			})
		}else{
			this.setState({
				gradeTask: true,
				currentlyGrading: id
			})
		}
	}
	useTab(x){
		this.setState({
			[x]:true
		})
		if (x === "taskTab"){
			this.setState({
				ExtraCreditTab:false,
				compentencyTab:false
			})
		}else if(x === "compentencyTab"){
			this.setState({
				taskTab:false,
				ExtraCreditTab:false
			})
		}else if(x === "ExtraCreditTab"){
			this.setState({
				compentencyTab: false,
				taskTab:false
			})
		}
	}
	openModal(x){
		console.log(x)
	    this.setState({[x]: true});
	    console.log(this.state)
	  }
	 closeModal(x) {
	    this.setState({[x]: false});
	  }



	render(){
		console.log(this.state)
		return(
			<div>
				<div className="tabs is-fullwidth is-centered is-boxed">
				  <ul>
				    <li className={this.state.taskTab?"is-active" : ""}>
				      <a onClick={()=>this.useTab("taskTab")}>
				        <span>Task</span>
				      </a>
				    </li>
				    <li className={this.state.compentencyTab?"is-active" : ""}>
				      <a onClick={()=>this.useTab("compentencyTab")}>
				        <span>Compentency</span>
				      </a>
				    </li>
				    <li className={this.state.ExtraCreditTab?"is-active" : ""}>
				      <a onClick={()=>this.useTab("ExtraCreditTab")}>
				        <span>Extra Credit</span>
				      </a>
				    </li>
				  </ul>
				</div>
				{this.state.compentencyTab &&
				<div className="compentencyTab"> 
					<h1>Compentency</h1>

					<Comp taskChoices={this.state.tasks} addTaskToComp={this.addTaskToComp} compentencies={this.state.compentencies}/>

					<a className="button" onClick={()=>this.openModal("compOpen")}>Add Compentency</a>
				</div>}				{this.state.taskTab &&
				<div className="taskTab">
					<h1>Task</h1>

					{this.state.gradeTask? <GradeTask params={this.props.match.params.id} id={this.state.currentlyGrading} /> : <Task tasks={this.state.tasks} beginGrading={this.beginGrading} ec={false}/> 
					}

					<a className="button" name="taskOpen" onClick={()=>this.openModal("taskOpen")}>Add Task</a>
				</div>}
				{this.state.ExtraCreditTab &&
				<div className="ExtraCreditTab"> 
					<h1>Extra Credit</h1>
					<a className="a">All Tasks</a><a>Grade</a>
					<br/>

					<Task tasks={this.state.tasks} ec={true}/>
					<GradeTask />

					<a className="button" name="ecOpen" onClick={()=>this.openModal("ecOpen")}>Add Extra Credit</a>
				</div>}


				<Modal 
					isOpen={this.state.compOpen}
					onRequestClose={()=>this.closeModal("compOpen")} 
					className="compentencies">
							<SubmitComp params={this.props.match.params.id} up={this.updateComps} close={this.closeModal}/>
				</Modal>
				<Modal 
					isOpen={this.state.ecOpen}
					onRequestClose={()=>this.closeModal("ecOpen")} 
					className="tasks">
							<SubmitTask params={this.props.match.params.id} up={this.updateTasks} ec={true} close={this.closeModal} />
				</Modal>
				<Modal 
					isOpen={this.state.taskOpen} 
					onRequestClose={()=>this.closeModal("taskOpen")} 
					className="tasks">
							<SubmitTask params={this.props.match.params.id} up={this.updateTasks} ec={false} close={this.closeModal} /> 
				</Modal>
			</div>
			)
	}
}

export default TaskManager