import * as firebase from "firebase/app";
import router from '../router'

// Add the Firebase products that you want to use
import "firebase/auth";
// import { AuthenticationError } from "./user.service";

const FirebaseService = {

    init(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);

        // Observe User
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                // ...

                // TODO message: "Navigating to current location ("/") is not allowed"
                // name: "NavigationDuplicated"
                // _name: "NavigationDuplicated"
                // stack: "Error↵    at new NavigationDuplicated (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:1975:14)↵    at HTML5History.confirmTransition (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:2091:18)↵    at HTML5History.transitionTo (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:2035:8)↵    at HTML5History.push (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:2366:10)↵    at eval (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:2780:22)↵    at new Promise (<anonymous>)↵    at VueRouter.push (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:2779:12)↵    at Object.eval [as next] (webpack-internal:///./src/services/firebase.service.js:32:69)↵    at eval (webpack-internal:///./node_modules/@firebase/util/dist/index.cjs.js:1205:22)↵    at eval (webpack-internal:///./node_modules/@firebase/util/dist/index.cjs.js:1315:21)"
                // __proto__: Error
                if (user.emailVerified) {
                    router.push(router.history.current.query.redirect || '/');
                }
            } else {
                // User is signed out.
                // ...
            }
        });
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