// pages/journey-view/journey-view.js
const app = getApp();
const config = require('../../config');
const utils = require('../../utils/util.js');

Page({
  data: {
    teamId:'',
    array: ['请选择', '虹桥火车站', '虹桥机场', '上海南站', '上海火车站', '浦东机场', '闵行校区', '徐汇校区', '卢湾校区'],
    departure:1,
    destination:6,
    date: '2018-09-02',
    time1: '11:15',
    time2: '11:30',
    departureTime:'2018-09-02 10:26',
    journeyid:'',
    people:'',
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
    if (!app.globalData.openId) {
      utils.login((res) => {
        app.globalData.openId = res.data.openId;
        this.viewInfo();
      })
    } else {
      this.viewJourney();
    }
  },
  viewJourney: function () {
    wx.request({
      url: `${config.host}/viewTravel`,
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
      success: (res) => {
        console.log(res)
       if(res.data.status==2){
         //未完成程序编写!
         wx.showModal({
           title: '未找到有效行程',
           content: '您没有有效行程,是否新建行程?',
           success: function (res) {
             if (res.confirm) {
               wx.navigateTo({
                 url: '../journey-edit/journey-edit',
               })
             } else if (res.cancel) {
               wx.navigateBack({
                 
               })
             }
           }  
         })
       }
      else{
         var minOfTime = 60 * parseInt(res.data.time.slice(0, 2)) + parseInt(res.data.time.slice(3, 5));
    
         console.log(minOfTime);
      var date=new Date();
      if(minOfTime<res.data.advance)
         {
        date = Date.parse(res.data.date);
        date = date -  86400000 ; 
         }
       else{
        date = Date.parse(res.data.date);
         }
         console.log(date);
         
         var date1 = new Date(date);
         var Y = date1.getFullYear() + '/';
         var M = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) + '/';
         var D = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();

         var adTime = minOfTime -res.data.advance;
         var deTime = minOfTime + res.data.delay;
         if(adTime<0)
         {
           adTime=adTime+24*60;
         }
         if(deTime>(23*60+59))
         {
           deTime=deTime-24*60;
         }
         var adHour = (adTime-adTime % 60)/60;
         var adMin=adTime%60;
         var deHour = (deTime - deTime % 60) / 60;
         var deMin = deTime % 60;
         var le;
         var lb;
         var lc;
         var ld;
         le = adHour.toString().length;
         if (le<2)
         {
           adHour = '0' + adHour;
         }
         lb = adMin.toString().length;
         if (lb<2) {
           adMin = '0' + adMin;
         }
         lc = deHour.toString().length;
         if (lc<2) {
           deHour = '0' + deHour ;
         }
         ld = deMin.toString().length;
         if (ld<2) {
           deMin = '0' + deMin;
         }


        
        this.setData({
          date:Y+M+D,
          time: res.data.time,
          time1:adHour+`:`+adMin,
          time2:deHour + `:` + deMin,
          departure: res.data.departure,
          destination: res.data.destination,
          people:res.data.people,
          journeyid: res.data.journeyId
        })
      }
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

  onShareAppMessage: function (res) {
    if (this.data.journeyid!=''){
    return {
      title: `${this.data.array[this.data.departure]}到${this.data.array[this.data.destination]}的小伙伴带我一个！`,
      path: `/page/journeyShare/?openId=${app.globalData.openId}&journeyId=${this.data.journeyid}`,
      success: (res) => {
        // console.log(res);
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            wx.checkSession({
              success: () => {
                wx.request({
                  url: `${config.host}/travelShare`,
                  method: 'post',
                  data: {
                    openId: app.globalData.openId,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: ''
                  },
                  success: (res) => {
                    console.log('团队分享返回信息：' + res.data);
                  }
                })
              },
              fail: () => {
                wx.login({
                  success: (res) => {
                    wx.request({
                      url: `${config.host}/travelShare`,
                      method: 'post',
                      data: {
                        openId: app.globalData.openId,
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
        title: '您没有有效行程',
        content: '请先完善行程信息再分享!',
        showCancel: false,
        success: function (res) {
        }
      })
    }

  },
  
  //返回上一界面
  goBack:function (){
    wx.navigateBack({
    })
  },

  //前往编辑界面
  edit:function (){
   wx.navigateTo({
     url: '../journey-edit/journey-edit',
   }) 
  },

  //形成团队
  generateTeam:function()
  {
    wx.navigateTo({
      url: '../team/team',
    }) 
  }


})