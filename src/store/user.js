import {getUserTempId, saveUserToken2Local, getUserTokenFromLocal} from '@/tools/auth'
import {reqLogin, reqUserInfo, reqUserExit} from '@/api'
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
      return 'ok'
    }else{
      Message.error(result.message)
      return Promise.reject(result.message)
    }
  },
  // 退出登录
  async getUserExit(miniStore){
    let result = await reqUserExit()
    if(result.code === 200){
      miniStore.commit('SAVE_USER_EXIT')
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
  },
  SAVE_USER_EXIT(state){
    state.userInfo = {}
    state.userToken = ''
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