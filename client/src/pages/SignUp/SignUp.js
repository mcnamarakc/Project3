import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';

function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
};


class SignUp extends Component {
    //Setting component's initial state
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        redirectToLogin: false,
        error: {
            message: "",
            email: false
        }
    };

    

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        if (name === "password") {
            value = value.substring(0,15)
        }
        
        //Updating Input's State
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        const { email, password } = this.state;

        if (!emailIsValid(email)) {
            alert("Please enter a valid email address")
        } else if (password < 6) {
            alert("Enter a password longer than 6 characters")
        } else {
            API.Users.register(email, password)
                .then(response => response.data)
                .then(response => {
                    console.log(response)
                    if (!response.created) {
                        this.setState({
                            error: { 
                                message: "Email already exists",
                                email: true
                            }
                        })
                    } else {
                        this.setState({
                            redirectToLogin: true
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                });
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });
        }
    };
    
    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/login"/>
        }
        return (
            <div>
                <h2>Geograffeti API </h2>
                <div class="card h-100 text-center">
                    <div class="card-header">
                        <ul class="nav nav-pills card-header-pills">
                            <li class="nav-item">
                                <a class="nav-link active" href="/login">login</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Register  to get your API Key</h5>
                        <form>
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="firstName" 
                                    placeholder="John (optional)"
                                    value = {this.state.firstName}
                                    name="firstName"
                                    onChange= {this.handleInputChange}      
                                />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="lastName" 
                                    placeholder="Doe (optional)"
                                    value = {this.state.lastName}
                                    name ="lastName"
                                    onChange = {this.handleInputChange}   
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input 
                                    type="email" 
                                    class={`form-control ${this.state.error.email ? "is-invalid" : ""}`}
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                    value = {this.state.email} 
                                    name ="email"
                                    onChange = {this.handleInputChange}
                                />
                                    <small id="emailHelp" class="form-text text-muted">
                                        { this.state.error.email 
                                            ? this.state.error.message
                                            : "We'll never share your email with anyone else."
                                        }
                                    </small>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value = {this.state.password}
                                    name ="password" 
                                    onChange = {this.handleInputChange}
                                />
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    }



export default SignUp;

