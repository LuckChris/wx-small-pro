
const LIFESTYLE_BASE_URL = 'https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/lifestyle'
const HEWEATHER_API = 'https://free-api.heweather.net/s6/weather'
const AIR_API = 'https://free-api.heweather.net/s6/air'

module.exports = {
    // 和风天气开发key
    weatherKey:'1b786718a3ff43948558b3f12bb98d73',
    // 腾讯地图key
    qqMapkey:'5KPBZ-WJMKQ-6LJ52-GMXHA-ERJKV-B3BAX',
    //实时天气接口
    nowWeatherUrl:`${HEWEATHER_API}/now`,

    // 空气质量状况
    nowAirUrl:`${AIR_API}/now`,

    // 隔三小时天气
    hourlyUrl:`${HEWEATHER_API}/hourly`,


    // 生活指数
    lifestyleUrl:`${HEWEATHER_API}/lifestyle`,

    // 未来三天天气
    forecastUrl:`${HEWEATHER_API}/forecast`,


    // 天气图标基地址
    COND_ICON_BASE_URL :'https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/cond-white',

    // 背景图片基地址
    BG_IMG_BASE_URL:'https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/bg',

    bgImgList: [
        {
          name: 'calm',
          codes: [201, 901, 999],
          color: '#404e75'
        },
        {
          name: 'sunny',
          codes: [100, 900],
          color: '#7bc6ed'
        },
        {
          name: 'cloudy',
          codes: [101, 102, 103],
          color: '#4b97d3'
        },
        {
          name: 'overcast',
          codes: [104],
          color: '#92a4ae'
        },
        {
          name: 'windy',
          codes: [200, 202, 203, 204],
          color: '#679ad1'
        },
        {
          name: 'storm',
          codes: [205, 206, 207, 208, 209, 210, 211, 212, 213],
          color: '#43ccf0'
        },
        {
          name: 'rain',
          codes: [300, 302, 305, 309, 399],
          color: '#1186b1'
        },
        {
          name: 'hail',
          codes: [304],
          color: '#809fbe'
        },
        {
          name: 'moderate_rain',
          codes: [306, 314, 315],
          color: '#1865b7'
        },
        {
          name: 'heavy_rain',
          codes: [301, 303, 307, 308, 310, 311, 312, 316, 317, 318],
          color: '#7f95a2'
        },
        {
          name: 'freezing_rain',
          codes: [313, 404, 405, 406],
          color: '#2f81cd'
        },
        {
          name: 'light_snow',
          codes: [400, 408],
          color: '#5fbbe0'
        },
        {
          name: 'moderate_snow',
          codes: [401, 407, 409, 499],
          color: '#5cb4e4'
        },
        {
          name: 'heavy_snow',
          codes: [402, 403, 409, 410],
          color: '#5caceb'
        },
        {
          name: 'dust',
          codes: [503, 504, 507, 508],
          color: '#a59156'
        },
        {
          name: 'haze',
          codes: [500, 501, 502, 509, 510, 511, 512, 513, 514, 515],
          color: '#6b7e8c'
        }
      ],

  // 生活指数
  lifestyleImgList: {
    comf: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_comf.png`,
      txt: '舒适度指数'
    },
    drsg: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_drsg.png`,
      txt: '穿衣指数'
    },
    flu: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_flu.png`,
      txt: '感冒指数'
    },
    sport: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_sport.png`,
      txt: '运动指数'
    },
    trav: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_trav.png`,
      txt: '旅游指数'
    },
    uv: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_uv.png`,
      txt: '紫外线指数'
    },
    cw: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_cw.png`,
      txt: '洗车指数'
    },
    air: {
      src: `${LIFESTYLE_BASE_URL}/lifestyle_air.png`,
      txt: '晾晒指数'
    }
  },

    

}