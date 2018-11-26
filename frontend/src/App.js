import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { signIn } from './actions';

import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';

// Move to environment variables in production
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


class App extends Component {
    constructor(props) {
        super(props);
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    user.token = idToken;
                    user.db = firebase;
                    // Save user to state
                    this.props.signIn(user);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                // User is signed out.
                console.log('No user');
            }
        });
    }

    render() {
        return (
                <div>
                <Sidebar />
                <Map />
                <ToggleView />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
