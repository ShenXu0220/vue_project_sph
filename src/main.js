import Vue from 'vue'
import {Loading,MessageBox,Notification,Message} from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload';
// 引入图片
import picture from '@/assets/images/loading.gif'

import '@/mock/server'
// 引用
import '@/tools/validate'

Vue.config.productionTip = false
// 全局挂载组件
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)

// 使用图片懒加载
Vue.use(VueLazyload, {
  loading: picture
})

//element ui的特殊组件
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


new Vue({
  el:'#app',
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
})