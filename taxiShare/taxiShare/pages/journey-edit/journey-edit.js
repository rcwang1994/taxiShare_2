// pages/journey-edit/journey-edit.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    user: 1,
    date: '2000-01-01',
    time: '00:00',
    advance:'',
    delay:'',
    array: ['请选择', '虹桥火车站', '虹桥机场', '上海南站', '上海火车站', '浦东机场', '闵行校区', '徐汇校区', '卢湾校区'],
    index1: 0,
    index2: 0,
    array2: ['1', '2', '3'],
    index3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.openId) {
      utils.login((res) => {
        app.globalData.openId = res.data.openId;
        this.viewInfo();
      })
    } else {
      this.viewJourney();
    }
  
  },

  //获取行程信息
  viewJourney: function () {
    //测试用,编写未完成!
    this.setData({
      date: '2050-7-8',
      time: '13:24',
      advance:'10',
      delay:'5',
      index1: 1,
      index2: 3,
      index3: 0,
    })
    //测试用,编写未完成!
    wx.request({
      url: `${config.host}/viewTravel`,
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
       success: (res) => {
         if(res.data.status==2)
         {
           this.data.user=2;
         }
         //日期转字符串
         var date = new Date();
 
           date = Date.parse(res.data.date);
         var date1 = new Date(date);
         var Y = date1.getFullYear() + '-';
         var M = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) + '-';
         var D = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();

         this.setData({
           delay:res.data.delay,
           advance:res.data.advance,
           date: Y+M+D,
           time: res.data.time,
           index1: res.data.departure,
           index2: res.data.destination,
           index3: res.data.people-1,
         })
       }
    })
  },

  //跟踪输入框改变
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDepartureChange:function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1:e.detail.value
    })
  },
  bindDestinationChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindMemberNum: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  //提交函数
  formSubmit: function (e) {
    console.log('jinru')
    wx.request({
      url: `${config.host}/editTravel`,
      method: 'POST',
      data: {
        openId: app.globalData.openId,
        date: e.detail.value.date,
        time: e.detail.value.time,
        advance: e.detail.value.advance,
        delay: e.detail.value.delay,
        departure: e.detail.value.start,
        destination: e.detail.value.end,
        people: parseInt(this.data.index3)+1,
        user:this.data.user
      },
      success: (res) => {
        console.log(res);
        //提交完成,返回查看界面
        wx.navigateBack({
          delta: 2
        })
      }
    })  
  },
  formReset:function(){
    wx.navigateBack({
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})