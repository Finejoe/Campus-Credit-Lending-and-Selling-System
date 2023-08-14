const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        pagescroll: {
            scrollTop: 0
        },
        systeminfo: {},
        wxuid: '',
        stuid: '',
        name: '',
        password: '',
        isbindok: false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        var th = this;
        wx.getSystemInfo({
            success(res) {
                th.setData({
                    systeminfo: res
                });
            }
        });
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        this.setData({
            wxuid: prevPage.data.wxuid
        })
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },
    onUnload: function () {
        //绑定，传给上个界面以及存储！
        var that = this;
        if (this.data.isbindok) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
                stuid: that.data.stuid,
                name: that.data.name,
                isbind: true
            });
            //存储
            let stuinfomsg = [];
            stuinfomsg.unshift(that.data.name);
            stuinfomsg.unshift(that.data.stuid);
            wx.setStorageSync('stuinfo',stuinfomsg);
        }
    },
    stuidchange(e) {
        this.setData({
            stuid: e.detail.value
        })
    },
    namechange(e) {
        this.setData({
            name: e.detail.value
        })
    },
    pwchange(e) {
        this.setData({
            password: e.detail.value
        })
    },
    gotobind: function () {
        var that = this;
        if (!this.data.stuid || !this.data.name || !this.data.password) {
            wx.showToast({
                title: '请输入完整！',
                icon: "error",
                duration: 2000
            })
        } else {
            //查询信息正确性与绑定
            wx.request({
                url: 'http://120.25.123.46/checkdb/gobind',
                data: {
                    'wxuid': that.data.wxuid,
                    'stuid': that.data.stuid,
                    'name': that.data.name,
                    'password': that.data.password,
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                method: "POST",
                success: function (res) {
                    //绑定成功！
                    if (res.statusCode == 200 && res.data == 'ok') {
                        wx.showToast({
                            title: '绑定成功！',
                            icon: "success",
                            duration: 2000,
                        });
                        that.setData({
                            isbindok: true
                        });
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '绑定失败，用户名、姓名或密码错误！',
                            showCancel: false,
                        })
                    }
                },
                fail: function () {
                    wx.showModal({
                        title: '提示',
                        content: '绑定失败，网络或服务端出错，请稍后重试！',
                        showCancel: false,
                    });
                },
                complete: function () {
                    if (that.data.isbindok) {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                }
            })
        }
    }
});