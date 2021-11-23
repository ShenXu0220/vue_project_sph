import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'

Vue.use(Vuex)

const actions = {}

const mutations = {}

const state = {}

const getters = {}

export default new Vuex.Store({
  modules:{
    home,
    search
  },
  actions,
  mutations,
  state,
  getters
})