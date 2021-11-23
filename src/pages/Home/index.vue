<template>
	<div>
		<!-- 三级分类导航 -->
		<TypeNav/>
		<!-- 列表 -->
		<ListContainer/>
		<!-- 今日推荐 -->
		<Recommend/>
		<!-- 商品排行 -->
		<Rank/>
		<!-- 喜欢 -->
		<Like/>
		<!-- 楼层 -->
		<Floor v-for="floorObj in floorList" 
      :key="floorObj.id" 
      :floorObj="floorObj"
      :cname="`floor-swiper${floorObj.id}`"
    />
		<!-- 商标 -->
		<Brand/>
	</div>
</template>

<script>
  import {mapState} from 'vuex'
	import ListContainer from './ListContainer'
	import Recommend from './Recommend'
	import Rank from './Rank'
	import Like from './Like'
	import Floor from './Floor'
	import Brand from './Brand'

	export default {
		name:'Home',
		components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    computed:{
      ...mapState({
        floorList: state => state.home.floorList
      })
    },
    mounted(){
      this.$store.dispatch('getFloorList')
    }
	}
</script>