import axios from "axios";
// 导入NProgress包（进度条）对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getUserTempId} from '@/tools/auth'

// 进行一些全局的配置
const ajax = axios.create({
  baseURL:'/api',
  timeout: 5000
})

// 添加请求拦截器
ajax.interceptors.request.use((config)=>{
    NProgress.start()
    config.headers.userTempId = getUserTempId()
    return config
  },
    (error)=>{
      return Promise.reject(error)
  })

  // 添加响应拦截器
  ajax.interceptors.response.use(
    (response)=>{
      NProgress.done()
      return response.data
    },
    (error) =>{
      return Promise.reject(error)
    }
  )

  export default ajax