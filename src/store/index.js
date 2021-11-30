import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

Vue.use(Vuex)

const actions = {}

const mutations = {}

const state = {}

const getters = {}

export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    shopcart
  },
  actions,
  mutations,
  state,
  getters
})