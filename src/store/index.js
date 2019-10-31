import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
  },
  mutations: {
    setCustomers (state, payload) {
      state.customers = payload
    },
  },
  getters: {
    getCustomers: (state, getters) => {
      return state.customers;
    }
  }
})
