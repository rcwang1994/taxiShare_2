// pages/mine/mine.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {id:1, text: '个人信息', url: '../info-view/info-view', img: '../../sources/info.png', tips: '' },
      {id:2, text: '我的行程', url: '../journey-view/journey-view', img: '../../sources/journey.png', tips: '' },
      {id:3, text: '我的团队', url: '../team/team', img: '../../sources/team.png', tips: '' },
      { id: 4, text: '我的消息', url: '../message-list/message-list',img: '../../sources/message.png', tips: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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