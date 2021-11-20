import Mock from 'mockjs'
import floor from './floor.json'
import rollplay from './rollPlay.json'

// 模拟一个可以返回楼层数据的接口
Mock.mock('/mock/floor','get',{
  code:200,
  message:'成功',
  ok:true,
  data:floor
})

// 模拟一个可以返轮播图数据的接口
Mock.mock('/mock/rollplay','get',{
  code:200,
  message:'成功',
  ok:true,
  data:rollplay
})