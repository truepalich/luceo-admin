import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPageRelations: [],
    currentPageFilters: [],
  },
  mutations: {
    setCurrentPageRelations (state, payload) {
      state.currentPageRelations = payload
    },
    setCurrentPageFilters (state, payload) {
      state.currentPageFilters = payload
    },
  },
  getters: {
    getCurrentPageRelations: (state, getters) => {
      return state.currentPageRelations;
    },
    getCurrentRelationByKey: (state, getters) => (key) => {
      if (key) {
        var relationResult = []
        if (state.currentPageRelations[key]) {
          state.currentPageRelations[key].forEach(function(item) {
            relationResult.push(item.name)
          })
        }
        return relationResult
      }
    },
    getCurrentPageFilters: (state, getters) => {
      return state.currentPageFilters;
    },
    getCurrentFilterByKey: (state, getters) => (key) => {
      if (key) {
        var filterResult = []
        if (state.currentPageFilters[key]) {
          state.currentPageFilters[key].forEach(function(item) {
            filterResult.push(item.name)
          })
        }
        return filterResult
      }
    },
  }
})
