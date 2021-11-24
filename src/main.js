import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import '@/mock/server'

Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)

new Vue({
  el:'#app',
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
})