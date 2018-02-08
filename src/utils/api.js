import axios from 'axios';

const baseURL = "https://leaderboardtesting.herokuapp.com/"
var token = localStorage.getItem("token")
var header = {headers: {'Authorization': "bearer " + token}}

let leaderApi = {
	login: function(data){
		let url = baseURL + "api/teacherLogin"
		return axios.post(url,{
			email:data.email,
			password: data.password
		})
	},
	studentLogin: function(data){
		let url = baseURL + "api/studentLogin"
		return axios.post(url,{
			email:data.email,
			password: data.password
		})
	},

//////////////////////ADMIN////////////////////////////////////
	createClass: function(data){
		let url = baseURL + "api/createClass"
		return axios.post(url,{
			name: data.name,
			description: data.description,
			start: data.start,
			end: data.end
		}, header)
	},

	addTeacher: function(data, end){
		let url = baseURL +"api/assignTeacher/" + end

		return axios.put(url,{
			email: data.email
		}, header)
	},
	addStudent: function(data, end){
		let url = baseURL +"api/assignStudent/" + end

		return axios.put(url,{
			email: data.email
		}, header)
	},

////////////////////////UPDATE PROFILE////////////////////////////////////
	finishTeacher: function(data, end){
		let url = baseURL + "api/updateTeacher/" + end
		return axios.put(url, data)

	},
	finishStudent: function(data, end){
		let url = baseURL + "api/updateStudent/" + end
		return axios.put(url, data)

	},


///////////////////////VIEW INFO/////////////////////////////////////////////
	getTeacher: function(data){
		let url = baseURL + "api/teacher/" + data
		return axios.get(url)
	},
	getStudents: function(data){
		let url = baseURL + "api/studentsInClass/" + data
		return axios.get(url)
	},
	viewClass: function(data){
		let url = baseURL + "api/class/" + data
		return axios.get(url)
	},

	getDash: function(){
		let url = baseURL + "api/Dash/"
		return axios.get(url, header)
	},
	getAdminDash: function(){
		let url = baseURL + "api/adminDash/"
		return axios.get(url, header)
	},


/////////////////////TEACHER PANEL///////////////////////////////
	createTask: function(data,end){
		let url = baseURL + "api/createTask/" + end
		return axios.post(url,data,header)
	},
	createCompentency: function(data,end){
		let url = baseURL + "api/createCompentency/" + end
		return axios.post(url,data,header)
	},
	addTasktoCompentency: function(comp,task){
		let url = baseURL + "api/addTasktoComp/"+ comp +"/" + task
		return axios.put(url,{},header)
	},

	getStudentCompentency: function(){
		let url = baseURL + ""
		return axios.get(url)
	},
	getSubmittedTask: function(studentId, taskId){
		let url = baseURL + "api/getStudentTasks/" + studentId +"/"+ taskId
		return axios.get(url, header)
	},
	getYourSubmittedTask: function(id){
		let url = baseURL + "api/getYourStudentTasks/" + id
		return axios.get(url,header)
	},
	submitTask: function(data,end){
		let url = baseURL + "api/submitTask/" + end
		return axios.post(url,data,header)
	},
	getClassTask: function(end){
		let url = baseURL + "api/getClassTasks/" + end
		return axios.get(url)
	},
	getClassCompentency: function(end){
		let url = baseURL + "api/getClassComp/" +end
		return axios.get(url)
	},

	//////////////////Attendance///////////////////////

	markAttendance: function(data, studentId, attendanceId, classId){
		let url = baseURL + "api/markAttendance/" + studentId +"/"+attendanceId + "/" + classId
		return axios.post(url, data, header)
	},
	createAttendance: function(data, end){
		let url = baseURL + "api/createAttendance/" + end
		return axios.post(url, data, header)
	},
	getAttendance: function(end){
		let url = baseURL + "api/getClassAttendance/" + end
		return axios.get(url, header)
	},
	getStudentAttendance: function(studentId, attendanceId){
		let url = baseURL + "api/getStudentAttendance/" + studentId + "/" + attendanceId
		return axios.get(url, header)
	}

}

export default leaderApi