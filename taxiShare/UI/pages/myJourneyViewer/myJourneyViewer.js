const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    time:'',
    early:'',
    delay:'',
    origin: '',
    destination: '',
    memberNum:'',
  },


  clickEditJour:function(){
    wx.navigateTo({
      url: '../myJourneyEditor/myJourneyEditor'
    })
  },
  clickBack: function () {
    wx.navigateTo({
      url: '../myCenter/myCenter'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: app.globalData.date,
      time: app.globalData.time,
      early: app.globalData.early,
      delay: app.globalData.delay,
      origin: app.globalData.origin,
      destination: app.globalData.destination,
      memberNum: app.globalData.memberNum,
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