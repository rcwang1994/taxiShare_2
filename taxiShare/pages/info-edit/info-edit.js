// pages/info-edit/info-edit.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'commit',
    name:'',
    wechat:'',
    phone:'',
    gender:'',
    identity:'',
    education:0,
    educationArray:['本科','硕士','博士']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //读取用户信息
  if(!app.globalData.openId){
    utils.login((res)=>{
      app.globalData.openId = res.data.openId;
      this.viewInfo();
    })
  } else {
    this.viewInfo();    
  }

  },
  //获取用户信息
  viewInfo: function(){
    wx.request({
      url: `${config.host}/viewInfo`,
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          name:res.data.name,
          wechat:res.data.wechat,
          phone:res.data.phone,
          gender:res.data.gender,
          identity:res.data.identity,
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value);
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      education: e.detail.value
    })
  },
  //提交表单的事件
  formSubmit: function (e) {
    console.log(e.detail.value);
    wx.request({
      url: `${config.host}/editInfo`,
      method: 'POST',
      data:{
        openId: app.globalData.openId,
        name: e.detail.value.name,
        wechat: e.detail.value.wechat,
        phone: e.detail.value.phone,
        gender: e.detail.value.gender,
        identity: e.detail.value.identity,
      },
      success: (res) => {
      }
    })
    //提交完成,返回查看界面
    wx.navigateBack({
      delta: 2
    })
  },
  formReset: function () {
    wx.navigateBack({
      delta: 2,
    });
    // console.log('form发生了reset事件')
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