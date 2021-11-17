import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/home',
      name:'home',
      component: () => import ('@/pages/Home')
    },
    {
      path:'/login',
      name:'login',
      component: () => import ('@/pages/Login')
    },
    {
      path:'/register',
      name:'register',
      component: () => import ('@/pages/Register')
    },
    {
      path:'/search',
      name:'search',
      component: () => import ('@/pages/Search')
    },
  ]
})