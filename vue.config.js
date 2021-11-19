module.exports = {
  lintOnSave: false,//关闭语法检查
  devServer:{
    proxy:{
      'api':{
        target:'http://39.98.123.211',//目标服务器
        changeOrigin:true
      }
    }
  }
}