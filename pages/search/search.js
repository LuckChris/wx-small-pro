const app = getApp()
const api = app.globalData.api
const util = app.globalData.utils
const regeneratorRuntime = require('../../lib/regenerator')
Page({
  data: {
    filterName: ['北京市', '上海市', '广州市', '深圳市', '武汉市', '南京市', '昆明市'],
    allcityList: '',
    scrollIntoView:'title_0',
    barIndex:'A',
    inputValue:'',
    showMask:false,
    keywordList:'',
    showStyle:false
  },

  onLoad() {
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
      wx.showToast({
        title:'数据加载中~~',
        duration: 2000
      })
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
        wx.setStorageSync('cityList', sortObj)
        this.setData({
          allcityList: sortObj
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  tapIndexItem(event) {
    let id = event.currentTarget.dataset.item
    this.setData({
      scrollIntoView:`title_${id}`
    })
    //设置索引焦点
    setTimeout(() => {
      this.setData({
        barIndex : id
      })
    },300)
  },
  chooseCity(e) {
    let cityname =  e.currentTarget.dataset.set.fullname
    // wx.setStorageSync('city', cityname)
    if(cityname) {
      wx.navigateTo({
        url:`/pages/index/index?city=${cityname}`
    })
    }
  },
  cancelHandler() {
    this.setData({
      inputValue : '',
      showMask : false
    })

  },
  inputHandler(e) {
    setTimeout(() => {
    api.getKeywordsList({keyword:e.detail.value}).then(res=> {
      this.setData({
        keywordList : res.data,
        showStyle:true
      })
      })   
    },300)
  },
  focus() {
    this.setData ( {
      showMask : true
    })
  },
  chooseAddress(e) {
    console.log(e)
    let {title,location} = e.currentTarget.dataset.set
    console.log(title,location)
    if(title) {
      wx.navigateTo({
        url:`/pages/index/index?city=${title}&lat=${location.lat}&lng=${location.lng}`
    })
    }
  },
  chooseHotCity(e) {
    let addressname = e.currentTarget.dataset.set
    if(addressname) {
      wx.navigateTo({
        url:`/pages/index/index?city=${addressname}`
    })
    }

  }
})