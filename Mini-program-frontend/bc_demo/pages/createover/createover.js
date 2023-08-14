// pages/createover/createover.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgpath: '',
        magicid : '',
        upblock:false
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
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        this.setData({
            imgpath: prevPage.data.imgpath,
            magicid:prevPage.data.magicid,
            upblock:prevPage.data.upblock
        })
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
        //整个过程欧克！
        wx.switchTab({
          url: '/pages/index/index',
        })
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
    saveimgtophone: function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.imgpath,
            success: function (data) {
                wx.hideLoading()
                wx.showModal({
                    title: '提示',
                    content: '您的借条已保存到相册，请妥善保管！',
                    showCancel: false,
                })
            },
            fail: function (err) {
                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                    // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                    wx.showModal({
                        title: '提示',
                        content: '需要您授权保存相册',
                        showCancel: false,
                        success: modalSuccess => {
                            wx.openSetting({
                                success(settingdata) {
                                    console.log("settingdata", settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '获取权限成功,再次点击即可保存',
                                            showCancel: false,
                                        })
                                    } else {
                                        wx.showModal({
                                            title: '提示',
                                            content: '获取权限失败，将无法保存到相册哦~',
                                            showCancel: false,
                                        })
                                    }
                                },
                                fail(failData) {
                                    console.log("failData", failData)
                                },
                                complete(finishData) {
                                    console.log("finishData", finishData)
                                }
                            })
                        }
                    })
                }
            },
            complete(res) {
                wx.hideLoading()
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})