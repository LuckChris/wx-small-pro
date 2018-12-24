 
 const app =getApp()
 const api = app.globalData.api
 const util = app.globalData.utils

Page({
    data: {
        imgUrl: "../image/location_s_w.png" ,
        trip:[1,2,3,4],
        trips:['今天','明天','后天'],
        lifeList:[1,2,3,4,5,6,7,8,9,12,13,43,56,77]  ,
        greets:'' ,
        nowData:'',
        upDataTime:'',
        currentCity:''     
    },
    onShow() {
        this.init()
        this.getNowWeatherHandler()
    },
    //初始化
    init() {
        this.initGreetings()
    },

    // 初始化问候语
    initGreetings() {
        this.setData({
            greets:util.getGreetings()
        })       
    },
    getNowWeatherHandler() {
        return new Promise((resolve,reject) => {
            api.getNowWeather({
                location : '深圳'
            }).then((res) => {
                let data = res.HeWeather6[0]    
                this.setData({
                    currentCity:data.basic.location,
                    nowData : data.now,
                    upDataTime:data.update.loc.slice(5).replace(/-/, '/')
                })    
            })
        })
        
    }
})

