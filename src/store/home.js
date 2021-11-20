import {reqCategoryList,reqRollPlayList} from '@/api/index'

// 是首页的Vuex，存储数据的地方
const actions = {
  async getCategoryList(miniStore){
    let result = await reqCategoryList()
    // console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_CATEGORY_LIST', result.data.slice(0,15))
    }else{
      alert(result.message)
    }
  },
  // 获取轮播图数据
  async getRollPlayList(miniStore){
    let result = await reqRollPlayList()
    console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_ROLLPLAY_LIST', result.data)
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_CATEGORY_LIST(state, list){
    state.categoryList = list
  },
  SAVE_ROLLPLAY_LIST(state, list){
    state.rollPlayList = list
  }
}

const state = {
  categoryList:[],
  rollPlayList:[]
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}