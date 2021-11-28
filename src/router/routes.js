export default [
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
  {
    path:'/detail/:id',
    name:'detail',
    component: () => import ('@/pages/Detail'),
    meta:{
      showFooter: true
    }
  },
]