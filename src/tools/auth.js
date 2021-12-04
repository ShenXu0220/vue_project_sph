import {v4 as uuid} from 'uuid'

export function getUserTempId() {
  // 判断在local中有没有userTempId
  const userTempId = localStorage.getItem('userTempId')
  if(userTempId){
    return userTempId
  }else{
    const newUserTempId = uuid()
    localStorage.setItem('userTempId',newUserTempId)
    return newUserTempId
  }
}

// 登录成功后再locaStorage中保存token
export function saveUserToken2Local(token){
  localStorage.setItem('userToken', token)
}
// 从localStorage 中读取token
export function getUserTokenFromLocal() {
  return localStorage.getItem('userToken')
}