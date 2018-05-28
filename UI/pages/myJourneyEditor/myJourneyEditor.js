const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2000-01-01',
    time: '--:--',
    early:'',
    delay:'',
    origin: '',
    destination: '',
    array: ['请选择', '虹桥火车站', '虹桥机场','上海南站', '上海火车站', '浦东机场','闵行校区','徐汇校区','卢湾校区'],
    objectArray: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '虹桥火车站'
      },
      {
        id: 2,
        name: '虹桥机场'
      },
      {
        id: 3,
        name: '上海南站'
      },
      {
        id: 4,
        name: '上海火车站'
      },
      {
        id: 5,
        name: '浦东机场'
      },
      {
        id: 6,
        name: '闵行校区'
      },
      {
        id: 7,
        name: '徐汇校区'
      },
      {
        id: 8,
        name: '卢湾校区'
      },
    ],
    index1: 0,
    index2: 0,
    array2:['0','1','2','3'],
    index3:0,
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  updateJourInfo:function(){
    app.globalData.date = this.data.date
    app.globalData.time = this.data.time
    app.globalData.early = this.data.early
    app.globalData.delay = this.data.delay
    app.globalData.origin = this.data.array[this.data.index1]
    app.globalData.destination = this.data.array[this.data.index2]
    app.globalData.memberNum = this.data.array2[this.data.index3]

    console.log(app.globalData.date, app.globalData.time, app.globalData.early, app.globalData.delay, app.globalData.origin, app.globalData.destination, app.globalData.memberNum)
    wx.navigateTo({
      url: '../myJourneyViewer/myJourneyViewer'
    })
    
  },
  bindOriginChange: function (e) {
    this.setData({
      index1: e.detail.value,
    })
  },
  bindDestinationChange: function (e) {
    this.setData({
      index2: e.detail.value,
    })
  },
  bindMemberNum: function (e) {
    this.setData({
      index3: e.detail.value
    })
  },
  inputEarly:function(e){
    this.setData({
      early: e.detail.value
    })
  },
  inputDelay: function (e) {
    this.setData({
      delay: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


 
})