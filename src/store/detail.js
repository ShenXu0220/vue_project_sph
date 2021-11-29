import {reqDetailInfo} from '@/api/index'

const actions = {
  async getDetailInfo(miniStore, id){
    let result = await reqDetailInfo(id)
    console.log(result)
    if(result.code === 200){
     miniStore.commit('SAVE_DETAIL_INFO', result.data) 
    }else{
      alert(result.message)
    }
  }
}

const mutations = {
  SAVE_DETAIL_INFO(state, info){
    state.detailInfo = info
  }
}

const state = {
  detailInfo:{
    categoryView:{},
    skuInfo:{
      skuName:'',//商品名称
      price:0,
      skuImageList:[{}]//商品图片组（每一个是对象
    },
    spuSaleAttrList:{}
  }
}

const getters = {
  categoryView(state){
    return state.detailInfo.categoryView
  },
  skuInfo(state){
    return state.detailInfo.skuInfo
  },
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}