import {reqShopCartList} from '@/api/index'

const actions = {
  async getShopCartList(miniStore){
    let result =  await reqShopCartList()
    if(result.code === 200){
      miniStore.commit('SAVE_SHOPCART_LIST',result.data)
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_SHOPCART_LIST(state, list){
    state.shopCartList = list
  }
}

const state = {
  shopCartList:[]
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}