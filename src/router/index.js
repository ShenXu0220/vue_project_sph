import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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