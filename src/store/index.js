import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'

Vue.use(Vuex)

const actions = {}

const mutations = {}

const state = {}

const getters = {}

export default new Vuex.Store({
  modules:{
    home,
  },
  actions,
  mutations,
  state,
  getters
})