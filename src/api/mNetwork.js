import axios from "axios"
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// 创建一个新的axios实例
const mAjax = axios.create({
  baseURL:'/mock',
  timeout:5000,
})

// axios的请求拦截器
mAjax.interceptors.request.use((config) => {
  // console.log('axios的请求拦截器执行了')
  NProgress.start()
  return config
})

// 响应拦截器
mAjax.interceptors.response.use(
    (response)=>{
      // console.log('响应成功')
      NProgress.done()
      return response.data
    },
    (error)=>{
      // console.log('响应失败了', error)
      NProgress.done()
      // return Promise.reject(error)
      return new Promise (()=>{})
    }
)

export default mAjax