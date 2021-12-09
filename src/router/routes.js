export default [
  {path:'/',redirect:'/home'},
  {
    path:'/home',
    name:'home',
    component: () => import ('@/pages/Home'),
    meta:{ showFooter: true }
  },
  {
    path:'/login',
    name:'login',
    component: () => import ('@/pages/Login'),
    meta:{ showFooter: false }
    
  },
  {
    path:'/register',
    name:'register',
    component: () => import ('@/pages/Register'),
    meta:{ showFooter: false }
  },
  {
    path:'/search',
    name:'search',
    component: () => import ('@/pages/Search'),
    meta:{ showFooter: true }
  },
  {
    path:'/detail/:id',
    name:'detail',
    props:true,
    component: () => import ('@/pages/Detail'),
    meta:{ showFooter: true }
  },
  {
    path:'/addCart_success',
    name:'addCart_success',
    component: () => import ('@/pages/AddCartSuccess'),
    beforeEnter: (to, from, next) => {
      if(from.path.slice(0,7) === '/detail'){
        next()
      }else{
        next('/home')
      }
    },
    meta:{ showFooter: true }
  },
  {
    path:'/shopCart',
    name:'shopCart',
    component: () => import ('@/pages/ShopCart'),
    meta:{ showFooter: true }
  },
  {
    path:'/trade',
    name:'trade',
    component: () => import ('@/pages/Trade'),
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopCart'){
        next()
      }else{
        next('/home')
      }
    },
    meta:{ showFooter: true }
  },
  {
    path:'/pay',
    name:'pay',
    component: () => import ('@/pages/Pay'),
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/home')
      }
    },
    meta:{ showFooter: true }
  },
  {
    path:'/paySuccess',
    name:'paySuccess',
    component: () => import ('@/pages/PaySuccess'),
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/home')
      }
    },
    meta:{ showFooter: true }
  },
  {
    path:'/center',
    name:'center',
    component: () => import ('@/pages/Center'),
    meta:{ showFooter: true }
  },
]