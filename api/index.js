
const config = require('../utils/config')
const QQMapWX = require('../lib/qqmap-wx-jssdk.min.js')

// 腾讯地图创建
const QQMap = new QQMapWX({
    key:config.qqMapkey
})

//公用请求参数
const commonParam = {
    key:config.weatherKey,
    location:'beijing',
    lang:'zh-cn',
    unit:'m'
}

// 获取地理位置
const getLocation =() => {
    return new Promise((resolve,reject) => {
        wx.getLocation({
            type:'gcj02',
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
//实时天气
 const getNowWeather =(option) => {
     return new Promise((resolve, reject) => {
        wx.request({
            url:config.nowWeatherUrl,
            method:'GET',
            data:{
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

// 逐三小时天气
const getThreeHoursWeather=(option)=>{
  return new Promise((resolve,reject) => {
    wx.request({
      url:config.hourlyWeatherUrl,
      method:'GET',
      data:{
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
    getThreeHoursWeather
}