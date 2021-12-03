<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 表头 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 表体 -->
      <div class="cart-body" v-for="(shopCart, index) in shopCartList" :key="index">
        <ul class="cart-list" v-for="cartInfo in shopCart.cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input @click="handleCheck(cartInfo)" :checked="cartInfo.isChecked" type="checkbox" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handleChangeSkuNum('decrement', cartInfo)" href="javascript:void(0)" class="mins">-</a>
            <input @change="handleChangeSkuNum('change' ,cartInfo, $event)" type="text" :value="cartInfo.skuNum"  class="itxt">
            <a @click="handleChangeSkuNum('increment', cartInfo)" href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice * cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="handleDelete(cartInfo.skuId)" href="#none" class="sindelet">删除</a>
            <br>
          </li>
        </ul>
      </div>
    </div>
    <!-- 表尾 -->
    <div class="cart-tool">
      <div class="select-all">
        <input @click="handleCheckAll" :checked="isAll" class="chooseAll" type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="handleDelateChecked" href="#none">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
    <!-- 购物车为空时展示的页面 -->
    <div class="empty" v-show="!shopCartList.length">
      <h2 class="title">购物车空空如也</h2>
      <img src="./images/empty.gif" alt="">
    </div>
  </div>
</template>

<script>
import {reqCheckSkuInCart, reqCheckAllSkuInCart, reqDeleteSkuInCart, reqDeleteAllSkuInCart, reqAddOrUpdateCart} from '@/api'
import throttle from 'lodash/throttle'
import {mapState} from 'vuex'

  export default {
    name: 'ShopCart',
    mounted(){
      this.$store.dispatch('getShopCartList')
    },
    computed:{
      ...mapState({
        shopCartList: state => state.shopcart.shopCartList
      }),
      // 是否是全选的
      isAll(){
        return this.shopCartList.every(shopcart =>{
          return shopcart.cartInfoList.every(cartInfo =>{
            return cartInfo.isChecked
          })
        })
      },
      // 选中的商品总数 ***
      checkedCount(){
        return this.shopCartList.reduce((pre1, cartInfo1)=>{
          return pre1 + cartInfo1.cartInfoList.reduce((pre2, cartInfo2)=>{
            return pre2 + (cartInfo2.isChecked ? cartInfo2.skuNum : 0)
          },0)
        },0)
      },
      // 选中商品的总价
      totalPrice(){
        return this.shopCartList.reduce((pre1, cartInfo1)=>{
          return pre1 + cartInfo1.cartInfoList.reduce((pre2, cartInfo2)=>{
            return pre2 + (cartInfo2.isChecked ? cartInfo2.skuNum * cartInfo2.skuPrice : 0)
          },0)
        },0)
      }

    },
    methods:{
      // 封装一个函数，用户点击商品数量增减的时候发送请求
      async changeSkuInCartSkuNum(skuId, skuNum){
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        this.refreshCart(result) 
      },
      // 发送请求，重新渲染页面
      refreshCart(result){
        if(result.code !== 200) this.$message.warning(result.message)
        this.$store.dispatch('getShopCartList')
      },
      // 单选逻辑
      async handleCheck({skuId, isChecked}){
        isChecked = isChecked ? 0 : 1
        let result = await reqCheckSkuInCart(skuId, isChecked)
        this.refreshCart(result)
      },
      // 全选逻辑
      async handleCheckAll(event){
        // 将需要的数据整理好， isChecked
        let isChecked = event.target.checked ? 1 : 0
        //收集好购物车中所有商品的skuId，形成一个数组
        let skuIdList = []
        this.shopCartList.forEach(shopcart =>{
          shopcart.cartInfoList.forEach(cartInfo =>{
            skuIdList.push(cartInfo.skuId)
          })
        })
        let result = await reqCheckAllSkuInCart(isChecked, skuIdList)
        this.refreshCart(result)
      },
      // 删除单个当前的商品
      async handleDelete(id){
        if(confirm('确定要删除该项商品么？')){
          let result = await reqDeleteSkuInCart(id)
          this.refreshCart(result)
        }
      },
      // 删除勾选了的商品
      async handleDelateChecked(){
        // 整理好需要发送的请求体 skuIdList
        let skuIdList = []
        this.shopCartList.forEach(shopcart =>{
          shopcart.cartInfoList.forEach(cartInfo =>{
            if(cartInfo.isChecked){
              skuIdList.push(cartInfo.skuId)
            }
          })
        })
        if(confirm('确定要删除勾选了的商品么？')){
          let result = await reqDeleteAllSkuInCart(skuIdList)
          this.refreshCart(result)
        }
      },
      // 改变商品数量
      handleChangeSkuNum:throttle(function(type, {skuId,skuNum}, event){
        switch (type){
          case 'increment':
            if(skuNum === 200){
              this.$message.warning('最大值200')
            }else{
              this.changeSkuInCartSkuNum(skuId, 1)
            }
            break;
          case 'decrement':
            if(skuNum === 1){
              this.$message.warning('最小值1')
            }else{
              this.changeSkuInCartSkuNum(skuId, -1)
            }
            break;
          case 'change':
              // 获取输入的数值
              let {value} = event.target
              // 算出差值
              let disNum = value - skuNum
              this.changeSkuInCartSkuNum(skuId, disNum)
            break;
          default:
            break;
        }
      },500, {trailing: false})
    }
  }

</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }
			

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
					text-decoration: none;
					&hover {
						color: white !important;
					}
        }
      }
    }
  }
  .empty{
    text-align: center;
    h2{
      color:#333;
      margin-top: 40px;
      font-size: 20px;
    }
    img{
      width: 300px;
    }
  }
}
</style>