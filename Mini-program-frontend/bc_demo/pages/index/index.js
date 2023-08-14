// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindgotoform() {
    wx.navigateTo({
      //url: '../createform2/createform2'
      url: '../createform/createform'
      //url: '../signature/signature'
      //url: '../cssig/cssig'
      //url:'../signature/signature'
    })
  },
  onLoad() {
    this.setData({
      
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onReady(){

  },
  onHide(){

  },
})
