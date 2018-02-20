import React, {Component} from 'react'
import leaderApi from "../utils/api"

// class Assignments extends Component{
//   render(){
//     var assignments = this.props.assignments.map((item) => <div className="card has-text-centered"><h1 className="card-header">{item}</h1><div className="card-content">random stuff</div><div className="card-footer"><button>Grade</button></div></div>)
//     var extraCredit = this.props.extraCredit.map((item) => <div className="card has-text-centered"><h1 className="card-header">{item}</h1><div className="card-content">random stuff</div><div className="card-footer"><button>Grade</button></div></div>)
//     return (
//         <div className="columns container is-fluid">
//           <div className="has-text-centered assignment column">
//             <h1>Assignments</h1>
//             {assignments}
//           </div>
//           <div className="has-text-centered assignment column">
//             <h1>Extra Credit</h1>
//             {extraCredit}
//           </div>
//           <div className="attendance has-text-centered column">
//             <h1>Attendace</h1>
//           </div>
//         </div>
//       )
//   }
// }


class App extends Component {
  constructor() {
    super();
    this.state = { 
      assignments: false,
      profile: "",
      course: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value

    this.setState({
      [name] : value
    })
  }

  componentDidMount(){
		leaderApi.profile(this.props.match.params.id)
		.then(profile =>{
      console.log(profile)
        this.setState({
          profile: profile.data.profile,
          classes: profile.data.classes
        })
    })
	}

  render() {
    console.log(this.state)
    return (
      <div className="StudentProfile">

        <div className="columns container is-fluid">
          <div className="column">
            <div className="Links">
               <div className="ProfileImage"><img src={this.state.profile.img} alt=""></img></div>
               <div className="FullName"><h1>{this.state.profile.first_name}<span></span>{this.state.profile.last_name}</h1></div>
              
              <div className="ProfSites">
                  <div className="Linkedin"><center><a href={this.state.profile.linkedin}>Linkedin</a></center></div>
                  <div><center><a href={this.state.profile.github}>Github</a></center></div>
                  <div><center><a href="">Portfolio</a></center></div>
              </div>

             <div className="Contact"><center><button>Contact</button></center></div>
            </div>
          </div>


          <div className="Badges column">
            <h1> BADGES </h1>
          </div>
        </div>

        <center>
        <div className="CourseInfo">
          <select name="course" onChange={this.handleChange}>
            {this.state.classes && this.state.classes.map(i=> <option>{i.name}</option>)}
          </select>
          <center><p><b>{this.state.course.title}</b></p></center>
          <center><p>{this.state.course.description}</p></center>
          </div>
          </center>

           <br />

           {/*<Assignments extraCredit={this.state.extraCredit} assignments={this.state.assignments} /> */}

           <br/>

        
      

      </div>
    );
  }
}

export default App;
