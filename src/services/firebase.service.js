import * as firebase from "firebase/app";
// import router from '../router'

// Add the Firebase products that you want to use
import "firebase/auth";
import store from "../store";

const FirebaseService = {

    init(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);

        // Observe User
        firebase.auth().onAuthStateChanged(function (user) {
            window.console.log('onAuthStateChanged')
            window.console.log(user)
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
                // router.push(router.history.current.query.redirect || '/');
                window.console.log('onAuthStateChanged-user.emailVerified', user.emailVerified)
                window.console.log('onAuthStateChanged-user.emailVerified', user.uid)
                if (user.emailVerified) {
                    let payload = { type: 'auth/loginSuccess', accessToken: user.uid, emailVerified: user.emailVerified }
                    store.commit("auth/loginSuccess", payload)
                }
            } else {
                // User is signed out.
                window.console.log('onAuthStateChanged-User is signed out')
                store.commit('auth/logoutSuccess')//use mutation/ actions are for asynchronous ...
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

    signOut() {
        firebase.auth().signOut()
    }

}

export default FirebaseService