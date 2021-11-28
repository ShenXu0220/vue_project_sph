<template>
  <div class="pagination">
    <button @click="changePageNo(pageNo - 1)" :disabled="pageNo === 1">上一页</button>
    <button @click="changePageNo(1)" v-show="startEnd.start > 1">1</button>
    <span v-show="startEnd.start > 2">···</span>

    <button @click="changePageNo(index + startEnd.start)" v-for="(_, index) in (startEnd.end - startEnd.start + 1)" 
      :key="index"
      :class="{active: pageNo === index + startEnd.start}">
      {{index + startEnd.start}}
    </button>

    <span v-show="startEnd.end < totalPage - 1">···</span>
    <button @click="changePageNo(totalPage)" v-show="startEnd.end < totalPage"> {{ totalPage }} </button>
    <button @click="changePageNo(pageNo + 1)" :disabled="pageNo === totalPage">下一页</button>
    <span>共 {{ total }} 条</span>
  </div>
</template>
<script>
  export default {
    name:'Pagination',
    props:['total', 'pageNo', 'pageSize', 'continues','sendPage'],
    computed:{
      totalPage(){
        return Math.ceil(this.total / this.pageSize)
      },
      // 得出连续页数的开始和结束
      startEnd(){
        const {total, pageNo, pageSize, continues, totalPage} = this
        let start = 0
        let end = 0
        if(continues > totalPage){
          start = 1
          end = totalPage
        }else{
          start = pageNo - parseInt(continues / 2)
          end = pageNo + parseInt(continues / 2)
          if(start < 1){
            start = 1
            end = continues
          }
          if(end > totalPage){
            start = totalPage - continues + 1
            end = totalPage
          }
        }
        return {start, end}
      }
    },
    methods:{
      changePageNo(n){
        this.sendPage(n)
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: gray;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }

        &.active {
          cursor: not-allowed;
          background-color: #c81623;
          color: #fff;
        }
      }
      span {
        display: inline-block;
        line-height: 28px;
        font-size: 14px;
        color: gray;
        vertical-align: middle;
      }
    }
</style>