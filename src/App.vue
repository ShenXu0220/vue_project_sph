<template>
  <div>
    <Header/>
    <button @click="send">点击发送请求</button>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

import ajax from '@/api/network'

  export default {
    name:'App',
    components:{Header, Footer},
    methods:{
      async send(){
       let res = await ajax.get('/hitokoto/get?type=social')
       console.log(res)
      }
    }
  }
</script>

<style>
  
</style>