export function firebaseConfig() {
    return {
        apiKey: process.env.VUE_APP_FIREBASE_CONFIG_API_KEY,
        authDomain: process.env.VUE_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
        databaseURL: process.env.VUE_APP_FIREBASE_CONFIG_DB_URL,
        projectId: process.env.VUE_APP_FIREBASE_CONFIG_PROJECT_ID,
        storageBucket: process.env.VUE_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
        messagingSenderId: process.env.VUE_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
        appId: process.env.VUE_APP_FIREBASE_CONFIG_APP_ID
    }
}


export const AUTH_STATUS = {
    "IDLE": 0,
    "AUTHENTICATING" : 1,
    "LOGIN_ERR" : 2,
    "SIGNUP_ERR" : 3,
    "HAS_ACCOUNT" : 4,
    "LOGGED_OUT" : 5,
}