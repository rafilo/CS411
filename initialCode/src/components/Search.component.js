import React, { Component } from 'react';
import {searchWeather} from '../API_Calls/WeatherCall'

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
        // this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        // this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search_description: '',
            // todo_responsible: '',
            // todo_priority: '',
            search_completed: false
        }
    }

    onChangeSearchDescription(e) {
        this.setState({
            search_description: e.target.value
        });
    }

    // onChangeTodoResponsible(e) {
    //     this.setState({
    //         todo_responsible: e.target.value
    //     });
    // }

    // onChangeTodoPriority(e) {
    //     this.setState({
    //         todo_priority: e.target.value
    //     });
    // }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Search Description: ${this.state.search_description}`);

        // const newSearch = {
        //     search_description: this.search_description
        // };
        searchWeather(this.state.search_description)

        // console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        // console.log(`Todo Priority: ${this.state.todo_priority}`);
     
        // const newTodo = {
        //     todo_description: this.state.todo_description,
        //     todo_responsible: this.state.todo_responsible,
        //     todo_priority: this.state.todo_priority,
        //     todo_completed: this.state.todo_completed
        // };

        // axios.post('http://localhost:4000/todos/add', newTodo)
        //     .then(res => console.log(res.data));

        this.setState({
            search_description: '',
            // todo_responsible: '',
            // todo_priority: '',
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
                    {/* <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div> */}
                    {/* <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div> */}
                    {/* </div> */}

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