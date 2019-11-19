import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import hash from "./hash";



import Search from "./components/Search.component";
import flightInfo from "./components/flight-Search.component";
import Home from "./components/Home.component";
import About from "./components/about.component";
// import LandingPage from "./components/LandingPage";

import logo from "./plane.png";


class App extends Component {
  
  render() {
    return (
      
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
              <img src={logo} width="30" height="30" alt="youtube.com" />
            </a>
            
            <Link to="/home" className="navbar-brand">EPOCH</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/flights" className="nav-link">Flight Info</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/search" className="nav-link">Weather Search</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/about" className="nav-link">About us</Link>
                </li>
                
              </ul>
              
            </div>
          </nav>
          <br/>
          
          
        <Route path="/home" component={Home} />
            <Route path="/flights" component={flightInfo} />
            <Route path="/search" component={Search} />
            <Route path="/about" component={About} />

            
        </div>
      </Router>
      
      
    );
  }

  
}

export default App;