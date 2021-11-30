<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><span class="iconfont icon-success"></span>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuShowObj.skuImg">
          </div>
          <div class="right-info">
            <p class="title">{{skuShowObj.skuName}}</p>
            <p class="attr" v-for="(key, value) in skuShowObj.skuAttr" :key="key">{{key}}：{{value}}</p>
            <p class="attr">商品数量：{{skuShowObj.skuNum}}</p>
            <p class="attr">单价：{{skuShowObj.skuPrice}}</p>
          </div>
        </div>
        <div class="right-gocart">
          <a class="btn-danger" @click="back">查看商品详情</a>
          <router-link to="/shopCart" class="btn-danger">去购物车结算</router-link >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',
    data(){
      return{
        skuShowObj: JSON.parse(sessionStorage.getItem('skuShowObj'))
      }
    },
    methods:{
      back(){
        this.$router.back()
      },
    }

  }
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;

        .icon-pc-right {
          background-color: #fff;
          border: 2px solid #6aaf04;
          padding: 3px;
          margin-right: 8px;
          border-radius: 15px;
        }
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 90px;
            float: left;
            img {
              width: 90px;
              height: 90px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1e1e1;
            color: #333;
            margin-left: 10px;
          }

          .btn-danger:hover {
            background-color: #e1251b;
            color: #fff;
          }
        }

      }
    }
  }
</style>