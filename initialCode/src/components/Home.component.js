import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const getAccessToken = require('../getAccessToken');

export const authEndpoint = 'https://accounts.spotify.com/authorize';


export default class Home extends Component {
    state = {
        data: null
      };
      constructor(){
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
          spotifyApi.setAccessToken(token);
          
        }
        this.state = {
          loggedIn: token ? true : false,
        }
      }
      
    
      componentDidMount() {
          // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ data: res.express }))
          .catch(err => console.log(err));
      }
        // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
      callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };
      getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      }
    render (){

        return (
            
            <div>
                {/* <p class = "d-flex justify-content-center">Welcome to This Amazing Project!!</p> */}
                <div class="container">
                    <div id="login">
                    <h1>Welcome to This Amazing Project!!</h1>
                    <a href='http://localhost:8888/' class="btn btn-primary">Log in with Spotify</a>
                    <div>
                    
                    Logged in: {this.state.loggedIn}
        
      </div>
                    
                    </div>
              
                </div>
  </div>
            
        )
    }
}