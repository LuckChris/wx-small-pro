//app.js

const config = require('./utils/config')
const utils = require('./utils/util')
const api = require('./api/index')
App({
  onLaunch: function () {
  },

  //全局数据
  globalData:{
    config,
    api,
    utils,
  }
 
})