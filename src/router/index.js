import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default new VueRouter({
  mode:'history',
  routes:[
    {path:'/',redirect:'/home'},
    {
      path:'/home',
      name:'home',
      component: () => import ('@/pages/Home'),
      meta:{
        showFooter: true
      }
    },
    {
      path:'/login',
      name:'login',
      component: () => import ('@/pages/Login'),
      meta:{
        showFooter: false
      }
      
    },
    {
      path:'/register',
      name:'register',
      component: () => import ('@/pages/Register'),
      meta:{
        showFooter: false
      }
    },
    {
      path:'/search',
      name:'search',
      component: () => import ('@/pages/Search'),
      meta:{
        showFooter: true
      }
    },
  ]
})