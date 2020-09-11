import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      _token: ''
  },
  mutations: {
      set_token(state, e) {
          state._token = e || ''
      }
  },
  actions: {
  },
  modules: {
  }
})
