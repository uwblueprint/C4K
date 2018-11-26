import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions'

import Button from '@material-ui/core/Button';
import * as firebase from 'firebase'

import "./Login.css";

const config = {
  apiKey: "AIzaSyCleo1v8xaS9vSirU8mn7nzR7AkhN0dyiM",
  authDomain: "c4k-dashboard.firebaseapp.com",
  databaseURL: "https://c4k-dashboard.firebaseio.com",
  projectId: "c4k-dashboard",
  storageBucket: "c4k-dashboard.appspot.com",
  messagingSenderId: "551785168434"
};
firebase.initializeApp(config)

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    signIn: (user) => dispatch(signIn(user))
})

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''    
    }

    saveUser = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                firebase.auth().currentUser.getIdToken(true).then(idToken => {
                    user.token = idToken;
                    // Save user to state
                    this.props.signIn(user);
                }).catch(err => {
                    console.log(err)
                });
            } else {
                // User is signed out.
                console.log('No user')
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let login = true;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(err => {
            login = false;
            this.setState({ errorMessage: err.message})
        });

        if (login) {
            this.saveUser();
        }
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
                        <p className="error">{this.state.errorMessage}</p>
                        <Button id="submit" variant="contained" color="primary" onClick={this.handleSubmit}>LOG IN</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
