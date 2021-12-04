import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 处理编程时路由导航的重复点击报错的问题
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,okCallback,errCallback){
  //若程序员使用push的时候，没有传递成功、失败的回调，那就靠catch
  if(okCallback === undefined && errCallback === undefined){
    return originalPush.call(this,location).catch(()=>{})
  }else{
    //若程序员使用push的时候，传递了成功、失败的回调，那就用
    return originalPush.call(this,location,okCallback,errCallback)
  }
 }
VueRouter.prototype.replace = function(location,okCallback,errCallback){
  //若程序员使用push的时候，没有传递成功、失败的回调，那就靠catch
  if(okCallback === undefined && errCallback === undefined){
    return originalReplace.call(this,location).catch(()=>{})
  }else{
    //若程序员使用push的时候，传递了成功、失败的回调，那就用
    return originalReplace.call(this,location,okCallback,errCallback)
  }
 }

let router = new VueRouter({
  mode:'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }else{
      return {x: 0, y: 0}
    }
  }
})
router.beforeEach((to, from ,next)=>{
  if(to.path === '/login'){
    return next()
  } else if (localStorage.getItem('userToken')){
    store.dispatch('getUserInfo')
  }
  next()
})

export default router