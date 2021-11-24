import {reqSearchInfo} from '@/api/index'

const actions = {
  async getSearchParams(miniStore,searchParams){
    let result = await reqSearchInfo(searchParams)
    // console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_SEARCH_INFO', result.data)
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_SEARCH_INFO(state, info){
    state.searchInfo = info
  }
}

const state = {
  searchInfo:{}
}

const getters = {
  goodsList(state){
    return state.searchInfo.goodsList
  },
  attrsList(state){
    return state.searchInfo.attrsList
  },
  trademarkList(state){
    return state.searchInfo.trademarkList
  },
}

export default {
  actions,
  mutations,
  state,
  getters
}