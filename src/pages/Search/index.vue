<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑_分类名 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 面包屑_关键词 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 面包屑_品牌 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{tName}}
              <i @click="removeTrademark">×</i>
            </li>
             <!-- 面包屑_属性 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{ dealProp(prop) }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        
        <!-- 当商品时，展示的样式 -->
        <div class="empty" v-show="!total" ref="emptyRef">
          <img src="https://static.360buyimg.com/devfe/error-new/1.0.0/css/i/error_06.png" alt="">
          <h2>非常抱歉，没有你想要的商品</h2>
        </div>

        <!-- 搜索器 -->
        <SearchSelector v-show="total" @sendTrademark="handleClickTrademark" @sendAttrValue="handleClickAttrValue"/>

        <!--商品展示区-->
        <div class="details clearfix" v-show="total">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li @click.prevent="changeOrder(1)" :class="{active: !isPrice}">
                  <a href="#">综合<span v-show="!isPrice" class="iconfont" :class="iconName"></span></a>
                </li>
                <li @click.prevent="changeOrder(2)" :class="{active: isPrice}">
                  <a href="#">价格<span v-show="isPrice" class="iconfont" :class="iconName"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list" >
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/'+ goods.id"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="'/detail/'+ goods.id"
                      :title="goods.title"
                      >{{goods.title}}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination 
          :total="total" 
          :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" 
          :continues="5"
          :sendPage="savePage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState ,mapGetters} from 'vuex'
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data(){
    return{
      searchParams:{
        category1Id: '',//一级分类id
        category2Id: '',//二级分类id
        category3Id: '',//三级分类id
        categoryName: '',//分类名
        keyword: '',//关键词
        props: [],//商品属性
        trademark: '',//品牌
        order: '1:desc',//排序
        pageNo: 1,//当前页码
        pageSize: 5 //每页展示多少条
      }
    }
  },
  methods:{
    // 封装发请求的方法
    search(n){
      if(n){
        this.searchParams.pageNo = 1
      }
      this.$store.dispatch('getSearchParams',this.searchParams)
    },

    // 移除面包屑的分类名
    removeCategoryName(){
      let {keyword} = this.$route.query
      this.$router.push({
        path:'/search',
        query:{
          keyword
        }
      })
    },
    // 移除面包屑的关键词
    removeKeyword(){
      let {query} = this.$route
      this.$router.push({
        path:'/search',
        query:{
          ...query,
          keyword:undefined
        }
      })
      // 借助全局事件总线，将头部组件的搜索框的keyword清空
      this.$bus.$emit('clear-keyword')
    },
    //点击获取searchSelector品牌的数据
    handleClickTrademark(trademark){
      let {tmId, tmName} = trademark
      // console.log(tmId, tmName)
      // 整合数据
      this.searchParams.trademark = `${tmId}:${tmName}`
      // 携带参数发请求
      this.search(1)
    },
    // 移除面包屑的品牌
    removeTrademark(){
      this.searchParams.trademark=""
      this.search(1)
    },
    // 点击获取searchSelector属性的数据
    handleClickAttrValue(prop){
      let result = this.searchParams.props.find((item) =>{
        return item === prop
      })
      if(!result){
        this.searchParams.props.push(prop)
        this.search(1)
      }
    },

    // 移除面包屑的属性
    removeProps(index){
      this.searchParams.props.splice(index, 1)
      this.search(1)
    },
    // 专门用于处理商品属性，形成一个规范的格式呈现给用户
    dealProp(str){
      return str.split(':')[2] + ':' + str.split(':')[1]
    },
    // 存储传来的页码，将页码传给searchParams的pageNo
    savePage(page){
      this.searchParams.pageNo = page
      this.search()
    },
    // 用于点击排序的回调
    changeOrder(type){
      let [oldType, oldFlg] = this.searchParams.order.split(':')
      // 当传来的类型值和在searchParams存储的类型值一致时
      if(type == oldType){
        let newFlg = oldFlg === 'asc' ? 'desc' : 'asc'
        // 维护数据
        this.searchParams.order = `${oldType}:${newFlg}`
        this.search()
      }else{
        this.searchParams.order = `${type}:desc`
      }
      this.search(1)
    }
  },
  computed:{
    // ...mapState({
    //   goodsList: state => state.search.searchInfo.goodsList
    // })
    // 获取Vuex里的数据
    ...mapGetters(['goodsList','attrsList','trademarkList','total']),
    // 整合trademark显示数据
    tName(){
      return this.searchParams.trademark.split(':')[1]
    },
    // 排序是否是价格
    isPrice(){
      return this.searchParams.order.split(':')[0] === '2'
    },
    // 箭头的指向
    iconName(){
      return this.searchParams.order.split(':')[1] === 'asc' ? 'icon-up' : 'icon-down'
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler(value){
        // console.log('$route改变了',value.query)
        let {query} = value
        Object.assign(this.searchParams, {
          category1Id: undefined,//一级分类id
          category2Id: undefined,//二级分类id
          category3Id: undefined,//三级分类id
          categoryName: undefined,//分类名
          keyword: undefined,//关键词
        })
        // 将参数进行整合
        this.searchParams = {...this.searchParams, ...query}
        // 参数整合后发送请求
        this.$store.dispatch('getSearchParams',this.searchParams)
      }
    },
  },

};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }

    .empty{
      text-align: center;
      h2{
        color: #333;
        margin: 10px 0;
      }
    }
  }
}
</style>
