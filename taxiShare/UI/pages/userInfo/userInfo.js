const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasWeChatNum:false,
    hasTelNum:false,
    canISave:false,
    weChatNum:null,
    telNum:null,
    userInfo: {},
    array: [ '请选择','本科生', '硕士生','博士生','教职工'],
    objectArray: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '本科生'
      },
      {
        id: 2,
        name: '硕士生'
      },
      {
        id: 3,
        name: '博士生'
      },
      {
        id: 4,
        name: '教职工'
      },
    ],
    index: 0,
    genderArray:['女','男'],
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    app.globalData.post = this.data.array[this.data.index]
  },

  inputWeChatNum: function (e) {
    this.setData({ 
      weChatNum: e.detail.value})
    if (this.data.weChatNum){
      this.setData({
        hasWeChatNum:true
      })
    }else{
      this.setData({
        hasWeChatNum: false
      })
    }
    this.setData({
      canISave: this.data.hasWeChatNum && this.data.hasTelNum
    })
  },

  inputTelNum: function(e) {
    this.setData({ 
      telNum: e.detail.value })
    if (this.data.telNum) {
      this.setData({
        hasTelNum: true
      })
    } else {
      this.setData({
        hasTelNum: false
      })
    }
    this.setData({
      canISave: this.data.hasWeChatNum && this.data.hasTelNum
    })
  },


  updateInfo: function (){
    app.globalData.weChatNum = this.data.weChatNum
    app.globalData.telNum = this.data.telNum
    // console.log(app.globalData.weChatNum, app.globalData.telNum)
    wx.navigateTo({
      url: '../userInfoViewer/userInfoViewer'
    })
  },

  deleteEdit:function(){
    wx.navigateTo({
      url: '../myCenter/myCenter'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo})
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})