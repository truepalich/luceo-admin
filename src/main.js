// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub


axios.interceptors.request.use(
  (request) => {
    eventHub.$emit('before-request')
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  (response) => {
    eventHub.$emit('after-response')
    return response
  },
  (error) => {
    eventHub.$emit('after-response')
    return Promise.reject(error)
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  template: '<App/>',
  components: { App }
})
