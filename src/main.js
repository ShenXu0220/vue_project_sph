import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import '@/mock/server'

Vue.config.productionTip = false
// 全局挂载组件
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)

new Vue({
  el:'#app',
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
})