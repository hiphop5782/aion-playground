const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:process.env.NODE_ENV === "production" ? "//www.sysout.co.kr/aion/" : "",
  devServer:{
    compress:true,
    port:8081,
    allowedHosts:"all",
    // https:true,
  },
})
