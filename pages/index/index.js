 
 const app =getApp()
 const api = app.globalData.api
 const util = app.globalData.utils
 const config = app.globalData.config

Page({
    data: {
        imgUrl: "../image/location_s_w.png" ,
        trip:[1,2,3,4],
        greets:'' ,
        nowData:'',
        upDataTime:'',
        currentCity:'',
        airStationList:''  ,
        lifeStyleList:'' ,
        futureList:[],
        swiperList:'',
        indicatorDots:true,
        indicatorActiveColor:'white',
        airInfoList:[]  
    },
    onShow() {
        this.init()
        this.initWeather()
       
    },
    toToLocation() {
        wx.navigateTo({
            url:'pages/search/search'
        })

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
      this.getNowAirInfo()
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
    getNowAirInfo() {
      return new Promise((resolve,reject) => {
        api.getNowAir({
          location : '深圳'
        }).then((res)=> {
            let data = res.HeWeather6[0].air_now_station
            this.airDataFormat(data) 
        resolve()

        }).catch((err) => {
            reject(err)
        })
      })
    },
    airDataFormat(data) {
        // let swiperTrip = Math.ceil(data.length / 4)
        // console.log(swiperTrip)
        // let grap = 4
        // let list=[]
        // swiperTrip.forEach((item,i)=>{
        //     list.push(data.slice(i*grap , (i+1)*grap))
        //     return list
        // })
        // for(let i=0;i<swiperTrip;i++) {
        //   list.push(data.slice(i*grap , (i+1)*grap))
        // }   
        // console.log(list) 
        // this.setData({
        //   airStationList:list,
        //   swiperList:swiperTrip
        // })


    },
    getlifeStyleInfo() {
        return new Promise((resolve,reject) => {
            api.getLifeStyleWeather({
                location : '深圳'               
            }).then((res) => {
                let data = res.HeWeather6[0].lifestyle
                this.formatLifeStyle(data)
                resolve()
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
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },
    fatureFormat(data) {
        let days = ['今天','明天','后天']
        console.log(data)
        data.forEach((item,index) => {
            item['day_name'] = days[index]
            item['date']= item.date.slice(5).replace('-','/')
            return data
        })
        this.setData({
            futureList:data
        })
    }

})

