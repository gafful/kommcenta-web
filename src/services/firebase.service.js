import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
// import { AuthenticationError } from "./user.service";

const FirebaseService = {

    init(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);
    },

    login(email, password) {
        // error: {code:"", message: ""}
        // success: 
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    signUp(email, password) {
        // error: {code:"", message: ""}
        // success: 
        return firebase.auth().createUserWithEmailAndPassword(email, password)

        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //   });          
    },

    sendEmailVerification() {
        var user = firebase.auth().currentUser;
        return user.sendEmailVerification()
        // .then(function () {
        //     // Email sent.
        // }).catch(function (error) {
        //     // An error happened.
        // });

    },

}

export default FirebaseService