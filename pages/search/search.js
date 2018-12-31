const app = getApp()
const api = app.globalData.api
const util = app.globalData.utils
const regeneratorRuntime = require('../../lib/regenerator')
Page({
  data: {
    filterName: ['北京市', '上海市', '广州市', '深圳市', '武汉市', '南京市'],
    allcityList: ''
  },

  onShow() {
    const value = wx.getStorageSync('cityList')
    if (value) {
      this.setData({
        allcityList: value
      })
    } else {
      this.getCityList()
    }
  },
  async getCityList() {
    try {
      let res = await api.getAllCityList()
      let sortObj = {}
      for (let i = 65; i <= 90; i++) {
        sortObj[String.fromCharCode(i)] = [];
      }
      let re = /^(110|120|310|810|820|500)/
      // 110,120,310,810,820,500
      if (res.result[1]) {
        res.result[1].map((item, index) => {
          if (!re.test(item.id)) {
            let first = item.pinyin[0].substring(0, 1);
            if (first) {
              sortObj[first.toUpperCase()].push(item)
            }
          }
        })
        util.delEmptyObj(sortObj)
        console.log('sortObj', sortObj)
        // wx.setStorageSync('cityList', sortObj)
        this.setData({
          allcityList: sortObj
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
})