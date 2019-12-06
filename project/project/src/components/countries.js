import React, { Component } from 'react'
import { Route } from 'react-router-dom'

const contacts = [
 {
   "id": "karen",
   "name": "Karen Isgrigg",
   "handle": "karen_isgrigg",
   "avatarURL": "http://localhost:5001/karen.jpg"
 },
 {
   "id": "richard",
   "name": "Richard Kalehoff",
   "handle": "richardkalehoff",
   "avatarURL": "http://localhost:5001/richard.jpg"
 },
 {
   "id": "tyler",
   "name": "Tyler McGinnis",
   "handle": "tylermcginnis",
   "avatarURL": "http://localhost:5001/tyler.jpg"
 }
];



class App extends Component {
  state = {
    country_name: "",
    description: ""
  }
  componentDidMount(){
    this.setState({
      country_name: "Japan",
      description: "Land of the rising sun"
    })
  }
  render() {
    return (
      <div>
        <p>Country:{this.state.country_name}</p>
        <br></br>
        <p>Description:{this.state.description}</p>
      </div>
    )
  }
}

export default App
