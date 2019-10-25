import React, { Component } from 'react';
import {searchWeather} from '../API_Calls/WeatherCall'

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search_description: '',
            search_completed: false
        }
    }

    onChangeSearchDescription(e) {
        this.setState({
            search_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Search Description: ${this.state.search_description}`);

        searchWeather(this.state.search_description)

    


        this.setState({
            search_description: '',
            search_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Enter a city! Temperature is returned in Farenheit!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Location: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.search_description}
                                onChange={this.onChangeSearchDescription}
                                />
                                
                    </div>
                    

                    <div className="form-group">
                        
                        <input type="submit" value="Search" className="btn btn-primary" />

                        <p class="d-flex justify-content-center">Output:</p>
                        <body class = "d-flex justify-content-center"><div class="error-message"></div></body>
                        <body class = "d-flex justify-content-center"><div class="city"></div></body>
                        <body class = "d-flex justify-content-center"><div class="temp"> </div></body>
                    </div>
                    
                </form>
                
            </div>
            
        )
    }
}