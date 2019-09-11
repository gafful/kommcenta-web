import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import ApiService from './services/api.service'
import FirebaseService from './services/firebase.service'
import { TokenService } from './services/storage.service'
import { firebaseConfig } from './utils/app.utils'

Vue.config.productionTip = false

ApiService.init(process.env.VUE_APP_ROOT_API)
FirebaseService.init(firebaseConfig())

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
