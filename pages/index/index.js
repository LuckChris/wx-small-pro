 
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
        lon:'',
        chooseCity:''
    },
   async onLoad(options) {  
        if(options.city) {
           this.setData({
            location : options.city
           }) 
        } else {
           let res = await this.getLcationCity()
           this.setData({
               location: res
           })
        }
        if(this.data.location || options.city) {
            this.init()
        }
    },
    toToLocation() {
        wx.navigateTo({
            url:`/pages/search/search`
        })
    },
    //初始化
   async init() {
        await this.initGreetings()
        // await this.initWeather()  
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
           return this.getCity({
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
           let city =  res.ad_info.city
           if(this.data.chooseCity) {
               this.setData({
                   location : this.data.chooseCity
               })
           } else {
                this.setData({
                    location:city
                })
           }        
           return city
      } catch (error) {
          console.log(error)          
      }
    },
   async getNowWeatherHandler() {
       try {
         let res = await  api.getNowWeather({location:this.data.location })
         if(res) {
            let data = res.HeWeather6[0] 
            let code = data.now.cond_code
            this.initBgImg(code) 
            this.setData({
                currentCity:data.basic.location,
                nowData : data.now,
                upDataTime:data.update.loc.slice(5).replace(/-/, '/'),
                iconUrl :`${BASE_ICON}/${data.now.cond_code}.png`
            })   
         }           
       } catch (error) {
           console.log(error)          
       }          
    },
   async  getNowAirInfo() {
       try {
           let res = await api.getNowAir({location:this.data.location})
           let data = res && res.HeWeather6[0].air_now_station
           this.airDataFormat(data) 
           
       } catch (error) {
           console.log(error)           
       }
    },
    airDataFormat(data) {
        let swiperTrip = Math.ceil(data.length / 4)
        let grap = 4
        let list=[]
        data.forEach((item,i)=>{
            item['upde_time'] = item.pub_time.slice(10).replace('/','-')
            return data
        })
        for(let i=0;i<swiperTrip;i++) {
          list.push(data.slice(i*grap , (i+1)*grap))
        }   
        this.setData({
          airStationList:list,
          swiperList:swiperTrip
        })
    },
   async getlifeStyleInfo() {
       try {
           let res = await api.getLifeStyleWeather({location : this.data.location})
           if(res) {
            let data = res.HeWeather6[0].lifestyle
            this.formatLifeStyle(data)
           }         
       } catch (error) {
           console.log(error)          
       }
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
   async getFutureInfo() {
       try {
           let res = await  api.getFutureWeather({location:this.data.location})
           let data = res && res.HeWeather6[0].daily_forecast
           this.fatureFormat(data)         
       } catch (error) {
           console.log(error)
       }
    },
    fatureFormat(data) {
        let days = ['今天','明天','后天']
        data.forEach((item,index) => {
            item['day_name'] = days[index]
            item['date']= item.date.slice(5).replace('-','/')
            item['iconUrld'] = `${BASE_ICON}/${item.cond_code_d}.png`
            item['iconUrln'] = `${BASE_ICON}/${item.cond_code_n}.png`
            return data
        })
        this.setData({
            futureList:data
        })
    }

})

