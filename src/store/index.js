import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPageRelations: [],
  },
  mutations: {
    setCurrentPageRelations (state, payload) {
      state.currentPageRelations = payload
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

    }
  }
})
