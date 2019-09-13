import { UserService, AuthenticationError } from '../../services/user.service'
import { TokenService } from '../../services/storage.service'
import router from '../../router'
import { AUTH_STATUS } from '../../utils/app.utils'

// export const STATUS = {
//     "IDLE": 0,
//     "AUTHENTICATING" : 1,
//     "LOGIN_ERR" : 2,
//     "SIGNUP_ERR" : 3,
//     "HAS_ACCOUNT" : 4,
//     // "EMAIL_VERIFIED" : 4,//EQUAL TO LOGGED_IN
//     // "EMAIL_NOT_VERIFIED" : 5,
//     "LOGGED_OUT" : 6,
// }

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    shouldVerifyEmail: false,

    status: AUTH_STATUS.IDLE,
    // hasAccount: false,
    emailVerified: false,
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    },

    emailVerified: (state) => {
        return state.emailVerified
    },

    shouldVerifyEmail: (state) => {
        return state.shouldVerifyEmail
    },

    status: (state) => {
        return state.status
    },

    // hasAccount: (state) => {
    //     return state.hasAccount
    // }
}

const actions = {
    async login({ commit }, { email, password }) {
        commit('loginRequest');

        try {
            const user = await UserService.login(email, password);
            commit('loginSuccess', user.token, user.emailVerified)

            // Redirect the user to the page he first tried to visit or to the home view
            router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', { errorCode: e.errorCode, errorMessage: e.message })
            }
            return false
        }
    },

    async logOut({ commit }) {
        window.console.log("logout-1");
        await UserService.logOut()

        // Logout service above will 
        // window.console.log("logout-2");
        commit('logoutSuccess')
        // window.console.log("logout-3");
        // router.push('/login')
    },

    async signUp({ commit }, { email, password }) {
        commit('signupRequest');

        try {
            const user = await UserService.signUp(email, password);
            commit('signupSuccess', user.uid, user.emailVerified)

            // Redirect the user to the page he first tried to visit or to the home view
            // router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('signupError', { errorCode: e.errorCode, errorMessage: e.message })
            }
            return false
        }
    },

    refreshToken({ commit, state }) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if (!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                },
                // error => {
                //     commit('refreshTokenPromise', null)
                // }
            )
        }

        return state.refreshTokenPromise
    },

    clearErrors({ commit }) {
        commit('clearErrors')
    },

    // updateEmailVerifiedState({ commit }, { token, emailVerified }) {
    //     commit('auth/loginSuccess', token, emailVerified, { root: true })
    // }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0

        state.status = AUTH_STATUS.AUTHENTICATING
    },

    // In most cases, the payload should be an object so that it can contain multiple fields
    loginSuccess(state, payload) {
        state.accessToken = payload.accessToken
        state.authenticating = false;

        // Flip could do too: status=hasAccount and another prop tells if verified
        // state.hasAccount = true
        // state.status = emailVerified ? STATUS.EMAIL_VERIFIED : STATUS.EMAIL_NOT_VERIFIED

        // window.console.log('loginSuccess', state, payload.accessToken, payload.emailVerified)

        state.status = AUTH_STATUS.HAS_ACCOUNT
        state.emailVerified = payload.emailVerified
    },

    loginError(state, { errorCode, errorMessage }) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage

        // Then avail the error code and details in other props
        state.status = AUTH_STATUS.LOGIN_ERR
    },

    logoutSuccess(state) {
        state.accessToken = ''
        state.emailVerified = false
        state.status = AUTH_STATUS.LOGGED_OUT
    },

    signupRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0

        state.status = AUTH_STATUS.AUTHENTICATING
    },

    signupSuccess(state, accessToken, emailVerified) {
        state.accessToken = accessToken
        state.authenticating = false;
        // state.emailVerified = emailVerified;
        state.shouldVerifyEmail = !emailVerified;

        state.status = AUTH_STATUS.HAS_ACCOUNT
        state.emailVerified = emailVerified
    },

    signupError(state, { errorCode, errorMessage }) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage

        state.status = AUTH_STATUS.SIGNUP_ERR
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    },

    clearErrors(state) {
        state.authenticationError = ''
        state.authenticationErrorCode = ''
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}