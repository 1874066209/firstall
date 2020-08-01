//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region:['北京市','北京市','东城区'],
    locationid:'',
    w_1:'0%',
    w_2:'0',
    w_3:'0',
    w_4:'0',
    w_5:'0',
    w_6:'0',
    icon:'999',
    wea_1:'19',
    wea_2:'多云'
  },
  changeRegion:function(e){
    this.setData({
      region: e.detail.value
    })
    this.getweather_1();//更新天气
  },
  getweather_1:function(e){
    var that=this;
    //this是当前对象，将当前this对象复制一份到that对象中
    //this不能直接在wxAPI中使用
    wx.request({
      url:'https://geoapi.heweather.net/v2/city/lookup?',
      data:{
         location:that.data.region[2],
         adm1:that.data.region[0],
         am2:that.data.region[1],
         mode:'fuzzy',
         key:'0109aa1e128142bda20a34f530ca68e6'
      },
      success:function(res){
        that.setData({
          locationid:res.data.location[0].id
        }),
        that.getweather_2()
        }
     })
    },
    getweather_2:function(e){
      var that=this;
      //this是当前对象，将当前this对象复制一份到that对象中
      //this不能直接在wxAPI中使用
      wx.request({
        url:'https://devapi.heweather.net/v7/weather/now?',
        data:{
           location:that.data.locationid,
           key:'0109aa1e128142bda20a34f530ca68e6'
        },
      success:function(res){
        that.setData({
          w_1:res.data.now.humidity,
          w_2:res.data.now.pressure,
          w_3:res.data.now.vis,
          w_4:res.data.now.windDir,
          w_5:res.data.now.windSpeed,
          w_6:res.data.now.windScale,
          icon:res.data.now.icon,
          wea_1:res.data.now.temp,
          wea_2:res.data.now.text
        })
      }
      })
    },
  //事件处理函数
  bindViewTap:function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e),
    app.globalData.userInfo = e.detail.userInfo,
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 })
