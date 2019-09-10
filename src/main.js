import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

Vue.config.productionTip = false
// Vue.prototype.$log = console.log.bind(console)

ApiService.init(process.env.VUE_APP_ROOT_API)

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
