import React, { Component } from 'react';

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <p class = "d-flex justify-content-center">About us: </p>
                <p class = "d-flex justify-content-center">We are a group of students studying computer science! This is our project for our CS411 class!</p>
                <p class = "d-flex justify-content-center">Group members:</p>
                <p class = "d-flex justify-content-center">Leo Chau</p>
                <p class = "d-flex justify-content-center">Ethan Go</p>
                <p class = "d-flex justify-content-center">Tung Truong</p>
                <p class = "d-flex justify-content-center">Sherry Wen</p>
            </div>
        )
    }
}