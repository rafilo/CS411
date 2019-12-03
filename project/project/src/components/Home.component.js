import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const getAccessToken = require('../getAccessToken');

export const authEndpoint = 'https://accounts.spotify.com/authorize';


export default class Home extends Component {
    // state = {
    //     data: null
    //   };
      constructor(){
        super();
        const params = this.getHashParams();
        console.log(params)
        const token = params.access_token;
        if (token) {
          spotifyApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
        }
      }
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
                <div className="container">
                    <div id="login">
                    <h1>Welcome to This Amazing Project!!</h1>
                    <a href='http://localhost:8888' className="btn btn-primary">Log in with Spotify</a>
                    <div>
                    
                    Logged in: {this.state.loggedIn}
        
      </div>
                    
                    </div>
              
                </div>
  </div>
            
        )
    }
}