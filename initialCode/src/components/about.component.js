import React, { Component } from 'react';

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <p class = "d-flex justify-content-center"><b> About us: </b></p>
                <body class = "d-flex justify-content-center">We are a group of students studying computer science! <br></br>  This is our project for our CS411 class!</body>
                <br></br>
                <p class = "d-flex justify-content-center">Group members:</p>
                <body class = "d-flex justify-content-center">Leo Chau</body>
                <body class = "d-flex justify-content-center">Ethan Go</body>
                <body class = "d-flex justify-content-center">Tung Truong</body>
                <body class = "d-flex justify-content-center">Sherry Wen</body>
            </div>
        )
    }
}