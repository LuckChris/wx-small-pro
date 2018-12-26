 
 const app =getApp()
 const api = app.globalData.api
 const util = app.globalData.utils
 const config = app.globalData.config

Page({
    data: {
        imgUrl: "../image/location_s_w.png" ,
        trip:[1,2,3,4],
        trips:['今天','明天','后天'],
        lifeList:[1,2,3,4,5,6,7,8,9,12,13,43,56,77]  ,
        greets:'' ,
        nowData:'',
        upDataTime:'',
        currentCity:'',
        hourlyInfo:''  ,
        lifeStyleList:'' ,
        futureList:[]  
    },
    onShow() {
        this.init()
        this.initWeather()
       
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
    // 初始化天气
    initWeather() {
      this.getNowWeatherHandler()
      this.getHoulyInfo()
      this.getlifeStyleInfo()
      this.getFutureInfo()

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
            }).catch((err) => {
                reject(err)
            })
        })
        
    },
    getHoulyInfo() {
      return new Promise((resolve,reject) => {
        api.getThreeHoursWeather({
          location : '深圳'
        }).then((res)=> {
          console.log(res)
          let data = res.HeWeather6[0]
          console.log(JSON.stringify(data))
          // this.setData({
          //   hourlyInfo:data.hourly
          // })

        }).catch((err) => {
            reject(err)
        })
      })
    },
    getlifeStyleInfo() {
        return new Promise((resolve,reject) => {
            api.getLifeStyleWeather({
                location : '深圳'               
            }).then((res) => {
                let data = res.HeWeather6[0].lifestyle
                this.formatLifeStyle(data)
                resolve()
                // this.setData({
                //     lifeStyleList:data.lifestyle
                // })
            }).catch((err) => {
                reject(err)
            })
        })
    },

    // 格式数据
    formatLifeStyle(data) {
        const lifeIcon = config.lifestyleImgList
        let lifestyle = data.reduce((prev,next) => {
            prev.push({
                brf:next.brf,
                txt:next.txt,
                iconTxt:lifeIcon[next.type].txt,
                iconUrl:lifeIcon[next.type].src
            })
            return prev
        },[])
        this.setData({
            lifeStyleList:lifestyle
        })

    },
    getFutureInfo() {
        return new Promise((resolve,reject) => {
            api.getFutureWeather({
                location:'深圳'
            }).then((res) => {
                let data = res.HeWeather6[0].daily_forecast
                this.fatureFormat(data)
                // console.log(res +'数据')
                // this.setData({
                //     futureList:data.daily_forecast
                // })
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },
    fatureFormat(data) {
        let days = ['今天','明天','后天']
        let futureList = data.reduce((prev,next) => {
            prev.push({
               data:next.data.slice()

            })
        })

    }

})

