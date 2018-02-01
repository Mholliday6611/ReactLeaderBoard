import React, {Component} from 'react'
import TKHLogo from "../img/TKHLogo.jpg"

class Nav extends Component {
	constructor(){
		super()

		this.state ={

		}
	}

	render(){
		return(
				<div className="navbar is-primary" role="navigation">
		          	<div className="navbar-brand">
		            	<a href=""><img className="TKHLogo navbar-item image is-96x96" src={TKHLogo} alt=""></img></a>
		          		<div className="Username navbar-item"><h1>@Username</h1></div>
		        	</div>
		        </div>
			)
	}
}

export default Nav