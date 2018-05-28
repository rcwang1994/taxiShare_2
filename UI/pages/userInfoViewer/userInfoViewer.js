const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:'',
    weChatNum: '',
    telNum: '',
    userInfo: {},
    array: ['请选择', '本科生', '硕士生', '博士生', '教职工'],
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
    genderArray: ['女', '男'],
  },


  clickEditInfo: function () {
    wx.navigateTo({
      url: '../userInfo/userInfo'
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
      userInfo: app.globalData.userInfo, post: app.globalData.post, weChatNum: app.globalData.weChatNum, telNum: app.globalData.telNum
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