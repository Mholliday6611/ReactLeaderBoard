import axios from 'axios';

const baseURL = "http://localhost:8080/"
var token = localStorage.getItem("token")

let leaderApi = {
	// register: function(data){
	// 	let url = baseURL + "api/register"
	// 	return axios.post(url, {
	// 		name:,
	// 		password:,
	// 		email:,
	// 		teacher:,
	// 		admin:,
	// 	})
	// },
	login: function(data){
		let url = baseURL + "api/teacherLogin"
		return axios.post(url,{
			email:data.email,
			password: data.password
		})
	},
	createClass: function(data){
		let url = baseURL + "api/createClass"
		return axios.post(url,{
			name: data.name,
			description: data.description,
			start: data.start,
			end: data.end
		}, {headers: {'Authorization': "bearer " + token}})
	},
	addTeacher: function(data, end){
		let url = baseURL +"api/assignTeacher/" + end

		return axios.put(url,{
			email: data.email
		}, {headers: {'Authorization': "bearer " + token}})
	},
	addStudent: function(data, end){
		let url = baseURL +"api/assignStudent/" + end

		return axios.put(url,{
			email: data.email
		})
	},
	getTeacher: function(data){
		let url = baseURL + "api/teacher/" + data
		return axios.get(url)
	},
	viewClass: function(data){
		let url = baseURL + "api/class/" + data
		return axios.get(url)
	},
	getDash: function(){
		let url = baseURL + "api/Dash/"
		return axios.get(url, {headers: {'Authorization': "bearer " + token}})
	},
	getAdminDash: function(){
		let url = baseURL + "api/adminDash/"
		return axios.get(url, {headers: {'Authorization': "bearer " + token}})
	},

}

export default leaderApi