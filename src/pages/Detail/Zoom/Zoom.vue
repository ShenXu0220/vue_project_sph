<template>
  <div class="spec-preview">
    <VuePhotoZoomPro
      :high-url="skuInfo.skuImageList[index].imgUrl"
      :out-zoomer="true"
      :scale="2"
      :width="200"
      :height="200"
      :selector="true">
      <img :src="skuInfo.skuImageList[index].imgUrl" alt="">
    </VuePhotoZoomPro>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'

  export default {
    name: "Zoom",
    components:{VuePhotoZoomPro},
    data(){
      return{
        index:0
      }
    },
    computed:{
      ...mapGetters(['skuInfo'])
    },
    mounted(){
      this.$bus.$on('send-index',(index)=>{
        this.index = index
      })
    },
    beforeDestroy(){
      this.$bus.$off('send-index')
    }

  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    img{
      width:100%;
    }
    .zoomer{
      top:0 !important;
      z-index: 2;
    }
    .selector{
      background: rgba(255, 11, 11, 0.5);
    }

  }
</style>