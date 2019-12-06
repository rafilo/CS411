import React, { Component } from 'react'
import { Route } from 'react-router-dom'

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
