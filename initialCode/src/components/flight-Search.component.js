import React, { Component } from 'react';
import {getFlights} from '../API_Calls/flightInfoCall'

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchSource = this.onChangeSearchSource.bind(this);
        this.onChangeSearchDestination = this.onChangeSearchDestination.bind(this);
        // this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search_description: '',
            search_Destination: '',
            // todo_priority: '',
            search_completed: false
        }
    }

    onChangeSearchSource(e) {
        this.setState({
            search_Source: e.target.value
        });
    }
        onChangeSearchDestination(e) {
        this.setState({
            search_Destination: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Search Source: ${this.state.search_Source}`);
        console.log(`Search Destination: ${this.state.search_Destination}`);
        getFlights()


        this.setState({
            search_Source: '',
            search_Destination: '',
            search_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Enter a Source and Destination:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Source: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.search_Source}
                                onChange={this.onChangeSearchSource}
                                />
                                
                    </div>
                    <div className="form-group"> 
                        <label>Destination: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.search_Destination}
                                onChange={this.onChangeSearchDestination}
                                />
                                
                    </div>


                    <div className="form-group">
                        
                        <input type="submit" value="Search" className="btn btn-primary" />

                        <p class="d-flex justify-content-center">Output:</p>
                        <p class = "d-flex justify-content-center"><div class="error-message"></div></p>
                        <p class = "d-flex justify-content-center"><div class="city"></div></p>
                        <p class = "d-flex justify-content-center"><div class="temp"></div></p>
                    </div>
                    
                </form>
                
            </div>
            
        )
    }
}