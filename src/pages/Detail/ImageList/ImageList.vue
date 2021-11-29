<template>
  <div class="swiper-container swiper-img">
    <div class="swiper-wrapper">
      <div class="swiper-slide smallImg" 
        v-for="(skuImg,index) in skuInfo.skuImageList" 
        :key="skuImg.id"
        @click="chooseImgShow(index)">
        <img :src="skuImg.imgUrl" >
      </div>     
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {mapGetters} from 'vuex'

  export default {
    name: "ImageList",
    computed:{
      ...mapGetters(['skuInfo'])
    },
    watch:{
      skuInfo(value){
        this.$nextTick(()=>{
        //创建Swiper实例
            new Swiper('.swiper-img', {
              slidesPerView:"auto",//同时展示几屏
              spaceBetween: 20,//图片之间的距离
              autoplay: { //自动轮播
                delay: 2000, //自动轮播间隔时间
                disableOnInteraction: true, //自动轮播期间，鼠标介入操作后，自动轮播是否停止
              },
              pagination: { //分页器
                el: '.swiper-pagination',
                clickable: true, //小圆点是否可以被点击
              },
              navigation: { //导航（左箭头、右箭头）
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
          })
        }
    },
    methods:{
      chooseImgShow(index){
        this.$bus.$emit('send-index', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;
    .smallImg{
      display: flex;
    }
    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>