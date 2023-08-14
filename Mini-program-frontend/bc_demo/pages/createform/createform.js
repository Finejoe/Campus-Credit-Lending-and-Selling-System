// pages/createform/createform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username1: '',
    username2: '',
    phonenum1: '',
    phonenum2: '',
    stuid1: '',
    stuid2: '',
    moneynum: '',
    infobk: '',
    date: '',
    wordnum: '0',
    isok: 'false',
    istx: false,
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

  },
  stu1change(e) {
    this.setData({
      stuid1: e.detail.value
    })
  },
  stu2change(e) {
    this.setData({
      stuid2: e.detail.value
    })
  },
  name1change(e) {
    this.setData({
      username1: e.detail.value
    })
  },
  name2change(e) {
    this.setData({
      username2: e.detail.value
    })
  },
  phone1change(e) {
    this.setData({
      phonenum1: e.detail.value
    })
  },
  phone2change(e) {
    this.setData({
      phonenum2: e.detail.value
    })
  },
  monchange(e) {
    this.setData({
      moneynum: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
      }),
      console.log(this.data.date)
  },
  infochange: function (e) {
    this.setData({
      infobk: e.detail.value
    })
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      wordnum: len
    })
  },

  //最后提交需要下一页预览加签名
  nextcreate: function () {
    var that = this;

    //进行为空检查
    if (this.data.username1 != '' && this.data.username2 != '' && this.data.phonenum1 != '' && this.data.phonenum2 != '' && this.data.stuid1 != '' && this.data.stuid2 != '' && this.data.moneynum != '' && this.data.date != '') {
      //接着查看学号、姓名是否存在且匹配！
      wx.showLoading({
        title: '请稍后',
      });
      wx.request({
        url: 'http://120.25.123.46/checkdb/cxstudent',
        data: {
          'stuid1': that.data.stuid1,
          "stuid2": that.data.stuid2,
          "name1": that.data.username1,
          "name2": that.data.username2
        },
        header: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: "POST",
        success: function (res) {
          console.log('cxstudent success!', res);
          wx.hideLoading();
          if (res.data == 'ok') {
            that.setData({
              istx: false,
              isok: true
            });
            that.gotonext();
          } else {
            if (res.statusCode == 200) {
              wx.showModal({
                title: '提示',
                content: '学号或姓名错误，请检查！',
                showCancel: false,
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '网络或服务端出错，请稍后重试！',
                showCancel: false,
              })
            }
          }
        },
        fail: function (res) {
          wx.hideLoading();
          console.log('cxstudent fail!--', res);
          that.setData({
            istx: true,
            isok: 'false'
          });
          wx.showModal({
            title: '提示',
            content: '网络或服务端出错，请稍后重试！',
            showCancel: false,
          })
        }
      });
    } else {
      this.setData({
        istx: true,
        isok: 'false'
      })
    }
    //进行后端交互
    if (this.data.isok == 'true') {
      this.gotonext()
    }
  },
  gotonext() {
    wx.navigateTo({
      url: '../createform2/createform2'
    })
  }

})