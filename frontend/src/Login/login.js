import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '.././CSS/LoginAssets/css/main.css'
import '.././CSS/LoginAssets/css/util.css'

class LoginUser extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginButton = e => {
        e.preventDefault()
        const { username, password } = this.state;
        axios
            .post('/users/login', {
                username: username,
                password: password
            })
            .then(res => {
                this
                    .props
                    .setUser(res.data.user);
                this.setState({ username: '', password: '', message: 'Success!' })
            })
            .catch(err => {
                this.setState({ password: '', message: 'Username / Password is incorrect' })
            })
    }

    render() {
        const { message } = this.state
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-landscape"></i>
                            </span>

                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
                            </span>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.handleInput} />
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleInput} />
                                <span className="focus-input100" data-placeholder="&#xf191;"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.handleLoginButton}>
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-90">
                                <h4>{message}</h4>
                                <Link to='/register'>
                                    Not a Member?
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginUser;
