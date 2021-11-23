import {reqCategoryList,reqRollPlayList,reqFloorList} from '@/api/index'

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
    // console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_ROLLPLAY_LIST', result.data)
    }else{
      alert(result.message)
    }
  },
  // 获取楼层数据
  async getFloorList(miniStore){
    let result = await reqFloorList()
    console.log(result)
    if(result.code === 200){
      miniStore.commit('SAVE_FLOOR_LIST',result.data)
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
  },
  SAVE_FLOOR_LIST(state,list){
    state.floorList = list
  }
}

const state = {
  categoryList:[],
  rollPlayList:[],
  floorList:[]
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}