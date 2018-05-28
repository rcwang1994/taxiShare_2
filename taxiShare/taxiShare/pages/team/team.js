// pages/myTeam/myTeam.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    departure: '上海',
    destination: '北京',
    teamId: '',
    finalTime: '2018/05/12---20:00',
    captain: '杰克',
    membersItems: ['队长', '成员', '成员'],
    membersName: '成员:',
    soldier: '###'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: () => {
        // console.log('showShareMenu')
      }
    })

    wx.request({
      url: `${config.host}/viewTeam`,
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
      success: (res) =>{
      console.log(res);
      this.setdData({
        teamId:res.data.teamId,
      })
      }
      }
    )
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
  onShareAppMessage: function (res) {
    if (this.data.teamId!=''){
    return {
      title: `${this.data.departure}到${this.data.destination}的小伙伴加入我们！`,
      path: `/page/teamShare/?openId=${app.globalData.openId}&teamId=${this.data.teamId}`,
      success: (res) => {
        // console.log(res);
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            wx.checkSession({
              success: () => {
                wx.request({
                  url: `${config.host}/teamShare`,
                  method: 'post',
                  data: {
                    openId: app.globalData.openId,
                    teamId: this.data.teamId,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code:''
                  },
                  success: (res) => {
                    console.log('团队分享返回信息：' + res.data);
                  }
                })
              },
              fail:()=>{
                wx.login({
                  success:(res)=>{
                    wx.request({
                      url: `${config.host}/teamShare`,
                      method: 'post',
                      data: {
                        openId: app.globalData.openId,
                        teamId: this.data.teamId,
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: res.code
                      },
                      success: (res) => {
                        console.log('团队分享返回信息：' + res.data);
                      }
                    })
                  }
                })
              }
            })

          },
          fail: (res) => {
          }
        })
      }
    }
    }
    else{
      wx.showModal({
        title: '您没有团队',
        content: '请先组建团队再分享!',
        showCancel: false,
        success: function (res) {
        }
      })

    }
  }
})