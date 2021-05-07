import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import VueTippy, { TippyComponent } from 'vue-tippy'
import 'tippy.js/themes/google.css'
import VueElectron from 'vue-electron'
Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)

if (!process.env.IS_WEB) Vue.use(VueElectron)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
