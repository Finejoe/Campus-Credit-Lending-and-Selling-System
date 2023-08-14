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
        brrin :[],
        brrout :[],
        num1: 1,
        num2: 1,
        wxid: '',
        isbind:false,
        chwhich: 1,
        isdown1: false,
        isdown2: false
    },

    eventEdit: function (e) {
        this.setData({
            [e.currentTarget.dataset.var]: e.detail.value
        });
    },
    eventNull: function () {},
    eventTrue: function (e) {
        this.setData({
            [e.currentTarget.dataset.var]: true
        });
    },
    eventFalse: function (e) {
        this.setData({
            [e.currentTarget.dataset.var]: false
        });
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
        var prevpage = pages[pages.length - 2];
        this.setData({
            wxid: prevpage.data.wxuid,
            isbind: prevpage.data.isbind
        });
        if (this.data.wxid&&this.data.isbind){
            this.getview1();
            this.getview2();
        } 
    },
    getview1:function () {
        var th = this;
        if (this.data.wxid && this.data.isbind && !this.data.isdown1) {
            wx.request({
                url: 'http://120.25.123.46/ctdb/viewiou1',
                method: 'POST',
                header: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                data: {
                    num: th.data.num1,
                    wxid: th.data.wxid
                },
                success: function (res) {
                    if (res.data == 'over') {
                        th.setData({
                            isdown1: true
                        })
                    } else if (res.data == 'no') {
                        wx.showModal({
                            title: '提示',
                            content: '服务器崩溃，gg',
                            showCancel: false
                        })
                    } else if(res.statusCode == 200){
                        var temp = th.data.brrin.concat(res.data)
                        th.setData({
                            brrin: temp
                        })
                    }else{
                        wx.showToast({
                          title: '未知错误',
                          icon:'error',
                          duration:2000
                        })
                    }
                    console.log('res:', th.data.brrin);
                },
                fail: function () {
                    console.log('网络出错');
                    wx.showToast({
                      title: '网络出错！',
                      icon:'error',
                      duration:2000
                    })
                }
            })
        }
    },
    getview2:function () {
        var th = this;
        if (this.data.wxid && this.data.isbind && !this.data.isdown2) {
            wx.request({
                url: 'http://120.25.123.46/ctdb/viewiou2',
                method: 'POST',
                header: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                data: {
                    num: th.data.num2,
                    wxid: th.data.wxid
                },
                success: function (res) {
                    if (res.data == 'over') {
                        th.setData({
                            isdown2: true
                        })
                    } else if (res.data == 'no') {
                        console("后端未查到wxid的学号！");
                        wx.showModal({
                            title: '提示',
                            content: '服务器崩溃，gg',
                            showCancel: false
                        })
                    } else if(res.statusCode == 200){
                        var temp = th.data.brrout.concat(res.data)
                        th.setData({
                            brrout: temp
                        })
                    }else{
                        wx.showToast({
                          title: '未知错误',
                          icon:'error',
                          duration:2000
                        })
                    }
                    console.log('res:', th.data.brrin);
                },
                fail: function () {
                    console.log('网络失败');
                    wx.showToast({
                      title: '网络出错！',
                      icon:'error',
                      duration:2000
                    })
                }
            })
        }
    },

    chose_card1: function () {
        this.setData({
            chwhich: 1
        })
    },
    chose_card2: function () {
        this.setData({
            chwhich: 2
        })
    },
    onReachBottom(){
        console.log('到底！')
        var that = this;
        if(this.data.chwhich == 1 && !this.data.isdown1){
            var num = this.data.num1 + 1;
            that.setData({num1:num});
            that.getview1();
        }else if(this.data.chwhich == 2&& !this.data.isdown2){
            var num = this.data.num2 + 1;
            that.setData({num2:num});
            that.getview2();
        }
        
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

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },
    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },
    
});