import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import firebase from "firebase";
import firebaseui from 'firebaseui';
import configureStore from './store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// var config = {
//     apiKey: "<API_KEY>",
//     authDomain: "<PROJECT_ID>.firebaseapp.com",
//     databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//     storageBucket: "<BUCKET>.appspot.com",
// };

// firebase.initializeApp(config);

firebaseui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});