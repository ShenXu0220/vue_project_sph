import {reqSearchList} from '@/api/index'

const actions = {
  async getSearchList( miniStore, data){
    let result = await reqSearchList(data)
    console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_SEARCH_LIST',result.data.goodsList)
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_SEARCH_LIST(state, value){
    state.searchList = value
  }
}

const state = {
  searchList: [],
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}