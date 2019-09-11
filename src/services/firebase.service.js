import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
// import { AuthenticationError } from "./user.service";

const FirebaseService = {

    init(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);
    },

    login(email, password) {
        window.console.log('email, password:', email, password)
        // try {
            return firebase.auth().signInWithEmailAndPassword(email, password)
        // } catch (error) {
            
        //     throw new AuthenticationError(error.code, message)
        // }
    },

    signUp(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)

        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //   });          
    },

}

export default FirebaseService