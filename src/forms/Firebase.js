import React from 'react'
import firebase from 'firebase'
const config={
    apiKey: "AIzaSyBJzeGfa2SmRpGcJKzKYDM-s6bXr67_PSw",
    authDomain: "otp-validation-b8b63.firebaseapp.com",
    projectId: "otp-validation-b8b63",
    storageBucket: "otp-validation-b8b63.appspot.com",
    messagingSenderId: "561085527360",
    appId: "1:561085527360:web:d6fefb96396444ec1236a5"
}

firebase.initializeApp(config)
var auth = firebase.auth();
export default auth
