// pages/usercenter/aboutus.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        screamH : 0,
        screamW : 750
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var rate = wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth;
        var height = rate*750;
        this.setData({
            screamH : height
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