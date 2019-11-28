import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

class Login extends Component {
    state = {
        firebaseConfig: {
            apiKey: "AIzaSyBA1a5KAKeWDuVYAD_iRZcUhaN8QEgFij8",
            authDomain: "login-254f2.firebaseapp.com",
            databaseURL: "https://login-254f2.firebaseio.com",
            projectId: "login-254f2",
            storageBucket: "login-254f2.appspot.com",
            messagingSenderId: "968149256801",
            appId: "1:968149256801:web:6585ac047f04754f377820",
            measurementId: "G-CCKZNN0XZ1"
        },
        auth: null
    }

    componentWillMount() {
        if (!firebase.apps.length)
            firebase.initializeApp(this.state.firebaseConfig);
    }

    componentWillUnmount() {

    }

    doSignOn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            const auth = {
                user: user,
                token: token
            };
            localStorage.setItem('auth', JSON.stringify(auth));
            this.setState({auth});
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }

    render() {
        if (this.state.auth != null)
            return <Redirect to='/' />
        return (
            <div className="login-container box-shadow">
                <h4 className="text-center text-black-50 mb-4 border-bottom border-white">Login with Social Media</h4>
                <div className="text-center">
                    <a className="google btn" onClick={() => this.doSignOn()}><i className="fa fa-google fa-fw">
                        </i> Login with Google+
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProp = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProp)(Login);