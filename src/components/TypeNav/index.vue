<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div
        class="nav-left"
        @mouseenter="showNav = true"
        @mouseleave="handleMouseLeave"
      >
        <h2 class="all">全部商品分类</h2>
        <transition enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
          <div class="sort animate__animated" v-show="showNav">
            <div class="all-sort-list2" @click.prevent="toSearch">
              <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
                <h3>
                  <a href="" :data-id="c1.categoryId" data-level="1">{{
                    c1.categoryName
                  }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href=""
                          class="category-child"
                          :data-id="c2.categoryId"
                          data-level="2"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href=""
                            class="category-child"
                            :data-id="c3.categoryId"
                            data-level="3"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import 'animate.css'
export default {
  name: "TypeNav",
  data() {
    return {
      showNav: false,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },

  methods: {
    toSearch(event) {
      let { id, level } = event.target.dataset;
      let value = event.target.innerText;
      // console.log(this.$route.query.keyword)
      let {keyword} = this.$route.query
      this.$router.push({
        path: "/search",
        query: {
          ["category" + level + "Id"]: id,
          categoryName: value,
          keyword
        },
      });
    },
    handleMouseLeave() {
      if (this.$route.path !== "/home") {
        this.showNav = false;
      }
    },
  },
  mounted() {
    if (this.$route.path === "/home") {
      this.showNav = true;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      --animate-duration: 0.3s;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
              .category-child {
                &:hover {
                  color: #e1251b;
                  font-weight: bold;
                }
              }
            }
          }

          &:hover {
            background: #e1251b;
            h3 {
              a {
                color: #fff;
              }
            }
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
