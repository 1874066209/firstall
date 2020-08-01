//index.js
//获取应用实例
const app = getApp()
function getRandomColor(){
  let rgb = []
  for(let i=0; i<3; ++i){
    let color = Math.floor(Math.random() *256).toString(16)
    color = (color.length == 1)?'0'+color:color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src:'',
    danmutxt:'',
    danmuList:[
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      }, 
      {
        text: '第 3s 出现的弹幕',
         color: '#ff00ff',
        time: 3
      }
    ],
    List:[
      {
        id:0,
        title:'微信打不开word文档怎么办',
        url_1:'https://ksv-video-publish.cdn.bcebos.com/49fae3ff44d839dde300a6561da157ef7d3f0b70.mp4?auth_key=1642846249-0-0-6f3da704de48cd43a2ba4de61f9d7391'
      },
      {
        id:1,
        title:'微信怎么发送word文档',
        url_1:'https://ksv-video-publish.cdn.bcebos.com/b59de37d994d529e33e4cb9d2a5678213ef3568d.mp4?auth_key=1642836486-0-0-4b7e725953deb4eabdf336fa2d41bf50'
      },
      {
        id:2,
        title:'手机word文档怎么发送到微信',
        url_1:'https://ksv-video-publish.cdn.bcebos.com/329172a5c8b2536e876a1ebc613a23aed19465dc.mp4?auth_key=1642841894-0-0-239a29bc1dd35d8d6565664c376b8e35'
      },
      {
        id:3,
        title:'手机word文档怎么用',
        url_1:'https://ksv-video-publish.cdn.bcebos.com/7d98651f240db58848b757d1cdfe7c2b8eb14188.mp4?auth_key=1642847118-0-0-2ed996772db9bcf83d8609ee96fe6c19'
      }
    ]
  },
  onLoad:function () {
    this.videoCtv=wx.createVideoContext('myvideo')
  },
  getDanmu:function(e){
    this.setData({
      danmutxt:e.detail.value
    })
  },
  sendDanmu:function(e){
    let content = this.data.danmutxt
    this.videoCtv.sendDanmu(
      {
      text:content,
      color:getRandomColor()
      }
    )
  },
  playvideo:function(e){
    this.setData({
      src:e.currentTarget.dataset.url
    })
  },
  playvideo_1:function(e){
    var that=this
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: 'flase',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          src:res.tempFilePath
        })
      }
    })
  }
})