import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

Vue.config.productionTip = false

ApiService.init(process.env.VUE_APP_ROOT_API)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
