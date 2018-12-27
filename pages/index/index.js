 
 const app =getApp()
 const api = app.globalData.api
 const util = app.globalData.utils
 const config = app.globalData.config
 const BG_IMG_BASE_URL = config. BG_IMG_BASE_URL
 const BASE_ICON = config.COND_ICON_BASE_URL

 const regeneratorRuntime = require('../../lib/regenerator') // 为了使用async await

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
        airInfoList:[],
        bgImgUrl:BG_IMG_BASE_URL +'/calm.jpg',  // 背景图片
        iconUrl:`${BASE_ICON}/999.png`,
        location:'',
        lat:'',
        lon:''
    },
    onShow() {
        this.init()     
    },
    toToLocation() {
        wx.navigateTo({
            url:'pages/search/search'
        })

    },
    //初始化
   async init() {
        await this.initGreetings()
        await this.getLcationCity()
        await this.initWeather()     
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
    initBgImg(code) {
        let cur = config.bgImgList.find((item) => {
            return item.codes.includes(code)

        })
        let url = BG_IMG_BASE_URL + (cur ? `/${cur.name}` : `/calm`) + '.jpg'
        this.setData({
            bgImgUrl:url
        })
    },
   async getLcationCity() {
       try {
        let {latitude,longitude} = await api.getLocation()
            this.setData({
                lat:latitude,
                lon:longitude
            })
            this.getCity({
                latitude,
                longitude
            })               
       } catch (error) {
           console.log(error)           
       }
    },
  async  getCity(option) {
      try {
           let res = await api.getCityByLon(option)
           this.setData({
               location:res.ad_info.city
           })         
      } catch (error) {
          console.log(error)          
      }
    },
    getNowWeatherHandler() {
        console.log(this.data.location + '城市')
        return new Promise((resolve,reject) => {
            api.getNowWeather({
                location :this.data.location 
            }).then((res) => {
                let data = res.HeWeather6[0] 
                if(data) {
                    // let code = data.now.cond_code || '101'
                    let code = 101
                    this.initBgImg(code)  
                }            
                // this.setData({
                //     currentCity:data.basic.location,
                //     nowData : data.now,
                //     upDataTime:data.update.loc.slice(5).replace(/-/, '/'),
                //     iconUrl :`${BASE_ICON}/${data.now.cond_code}.png`
                // })   
                resolve() 
            }).catch((err) => {
                reject(err)
            })
        })
        
    },
    getNowAirInfo() {
      return new Promise((resolve,reject) => {
        api.getNowAir({
          location : '昆明'
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
        // let grap = 4
        // let list=[]
        // data.forEach((item,i)=>{
        //     item['upde_time'] = item.pub_time.slice(10).replace('/','-')
        //     return data
        // })
        // for(let i=0;i<swiperTrip;i++) {
        //   list.push(data.slice(i*grap , (i+1)*grap))
        // }   
        // console.log(list +'list') 
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
        // let lifestyle = data.reduce((prev,next) => {
        //     prev.push({
        //         brf:next.brf,
        //         txt:next.txt,
        //         iconTxt:lifeIcon[next.type].txt,
        //         iconUrl:lifeIcon[next.type].src
        //     })
        //     return prev
        // },[])
        // this.setData({
        //     lifeStyleList:lifestyle
        // })

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
        // let days = ['今天','明天','后天']
        // data.forEach((item,index) => {
        //     item['day_name'] = days[index]
        //     item['date']= item.date.slice(5).replace('-','/')
        //     item['iconUrld'] = `${BASE_ICON}/${item.cond_code_d}.png`
        //     item['iconUrln'] = `${BASE_ICON}/${item.cond_code_n}.png`
        //     return data
        // })
        // this.setData({
        //     futureList:data
        // })
    }

})

