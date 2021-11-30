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