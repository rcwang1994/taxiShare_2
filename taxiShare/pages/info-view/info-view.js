// pages/info-view/info-view.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    infos: [
      {
        id: 1,
        icon: '',
        title: '姓&emsp;名',
        content:''
      },
      {
        id: 2,
        icon: '',
        title: '微信号',
        content:''
      },
      {
        id: 3,
        icon: '',
        title: '性&emsp;别',
        content:''
      },
      {
        id: 4,
        icon: '',
        title: '手&emsp;机',
        content:''
      },
      {
        id: 5,
        icon: '',
        title: '身&emsp;份',
        content:''
      },
    ],
    gender: ['男', '女'],
    identity: ['本科', '硕士', '博士']
  },

  //返回函数
  goBack: function () {
    wx.navigateBack({
    })
  },
  //前往编辑界面
  goToEdit: function () {
    wx.navigateTo({
      url: '../info-edit/info-edit',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取用户信息
    if (!app.globalData.openId) {
      utils.login((res) => {
        app.globalData.openId = res.data.openId;
        this.viewInfo();
      })
    } else {
      this.viewInfo();
    }
  },

  //获取用户信息
  viewInfo: function () {
    wx.request({
      url: `${config.host}/viewInfo`,
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
      success: (res) => {
        console.log(res.data);
        var gender = this.data.gender[res.data.gender - 1];
        var identity = this.data.identity[res.data.identity];
        this.setData({
          'infos[0].content': res.data.name,
          'infos[1].content': res.data.wechat,
          'infos[2].content': gender,
          'infos[3].content': res.data.phone,
          'infos[4].content': identity,
        })
      }
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