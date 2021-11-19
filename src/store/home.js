import {reqCategoryList} from '@/api/index'

// 是首页的Vuex，存储数据的地方
const actions = {
  async getCategoryList(miniStore){
    let result = await reqCategoryList()
    // console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_CATEGORY_LIST', result.data)
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_CATEGORY_LIST(state, list){
    state.categoryList = list
  }
}

const state = {
  categoryList:[]
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}