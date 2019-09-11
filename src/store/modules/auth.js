import { UserService, AuthenticationError } from '../../services/user.service'
import { TokenService } from '../../services/storage.service'
import router from '../../router'


const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    emailVerified: false,
    shouldVerifyEmail: false,
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
    }
}

const actions = {
    async login({ commit }, { email, password }) {
        commit('loginRequest');

        try {
            const token = await UserService.login(email, password);
            commit('loginSuccess', token)

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

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
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
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },

    loginError(state, { errorCode, errorMessage }) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
        state.accessToken = ''
    },

    signupRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    signupSuccess(state, accessToken, emailVerified) {
        state.accessToken = accessToken
        state.authenticating = false;
        state.emailVerified = emailVerified;
        state.shouldVerifyEmail = !emailVerified;
    },

    signupError(state, { errorCode, errorMessage }) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
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