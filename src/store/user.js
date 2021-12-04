import {getUserTempId, saveUserToken2Local, getUserTokenFromLocal} from '@/tools/auth'
import {reqLogin, reqUserInfo} from '@/api'
import {Message} from 'element-ui'

const actions = {
  async userLogin(miniStore, loginParams){
    let result = await reqLogin(loginParams)
    if(result.code === 200){
      miniStore.commit('SAVE_USER_TOKEN', result.data.token)
      saveUserToken2Local(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(result.message)
    }
  },
  async getUserInfo(miniStore){
    let result = await reqUserInfo()
    if(result.code === 200){
      miniStore.commit('SAVE_USER_INFO', result.data)
    }else{
      Message.error(result.message)
    }
  }
}

const mutations = {
  SAVE_USER_TOKEN(state, token){
    state.userToken = token
  },
  SAVE_USER_INFO(state, info){
    state.userInfo = info
  }
}

const state = {
  userTempId: getUserTempId(),
  userToken:getUserTokenFromLocal(),
  userInfo:{}
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}