//app.js

const config = require('./utils/config')
const utils = require('./utils/util')
const api = require('./api/index')
App({
  onLaunch: function () {
    // if(!wx.cloud) {
    //   console.error('请使用2.2.3或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     traceUser: Skew()
    //   })

    // }
   
  },

  //全局数据
  globalData:{
    config,
    api,
    utils,
  }
 
})