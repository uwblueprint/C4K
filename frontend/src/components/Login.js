import React from 'react';
import Button from '@material-ui/core/Button';

import "./Login.css";

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="loginLayout">
                <div className="logo">
                    <img src="./assets/C4K_logo_hor_gold_WHITE.png" alt="Capitalize for Kids"/>
                </div>
                <div className="container">
                    <div className="description">
                        <div className="title">Welcome!</div>
                        <p>We invest in kids’ mental health by working with service providers to build capacity.</p>
                    </div>
                    <form id="login">
                        <label>Email
                        <input id="email" type="email" required onChange={this.onChangeEmail}></input>
                        </label>
                        <label>Password
                        <input id="password" type="password" required onChange={this.onChangePassword}></input>
                        </label>
                        <Button id="submit" variant="contained" color="primary" onClick={this.handleSubmit}>LOG IN</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;