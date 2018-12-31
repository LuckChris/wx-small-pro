
const config = require('../utils/config')
const QQMapWX = require('../lib/qqmap-wx-jssdk.min.js')

// 腾讯地图创建
const QQMap = new QQMapWX({
  key: config.qqMapkey
})

//公用请求参数
const commonParam = {
  key: config.weatherKey,
  location: 'beijing',
  lang: 'zh-cn',
  unit: 'm'
}

// 获取地理位置
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//通过经纬度获取城市
const getCityByLon = (option) => {
  return new Promise((resolve, reject) => {
    QQMap.reverseGeocoder({
      location: {
        latitude: option.latitude,
        longitude: option.longitude
      },
      success(res) {
        resolve(res.result)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

// 获取全部城市列表
const getAllCityList = () => {
  return new Promise((resolve, reject) => {
    QQMap.getCityList({
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })  
  })
}

//实时天气
const getNowWeather = (option) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.nowWeatherUrl,
      method: 'GET',
      data: {
        ...commonParam,
        ...option
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })

}

// 空气质量实况
const getNowAir = (option) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.nowAirUrl,
      method: 'GET',
      data: {
        ...commonParam,
        ...option
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })

  })
}
// 生活指数
const getLifeStyleWeather = (option) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.lifestyleUrl,
      method: 'GET',
      data: {
        ...commonParam,
        ...option
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }

    })
  })
}

// 未来三天
const getFutureWeather = (option) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.forecastUrl,
      method: 'GET',
      data: {
        ...commonParam,
        ...option
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
module.exports = {
  getLocation,
  getNowWeather,
  getNowAir,
  getLifeStyleWeather,
  getFutureWeather,
  getCityByLon,
  getAllCityList
}