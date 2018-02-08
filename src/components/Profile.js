import React, {Component} from 'react'
import leaderApi from "../utils/api"

class Profile extends Component {
	constructor(){
		super();
		this.state ={
		}
	}
	componentDidMount(){
		leaderApi.profile(this.props.match.params.id)
		.then(function(profile){
			this.setState({
				profile: profile
			})
		})
	}

	render(){
		return(
				<div>
				</div>
			)
	}
}

export default Profile