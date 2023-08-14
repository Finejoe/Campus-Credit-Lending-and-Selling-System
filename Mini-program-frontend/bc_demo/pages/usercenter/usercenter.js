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
        userInfo: '',
        wxuid: '',
        hasUserInfo: false,
        isbind: false,
        stuid: '',
        name: ''
    },
    cxbind: function () {
        var that = this;
        console.log('cxbind -- wxuid', that.data.wxuid)
        wx.request({
            url: 'http://120.25.123.46/checkdb/cxbind',
            data: {
                'wxuid': that.data.wxuid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            method: "POST",
            success: function (res) {
                console.log('cxbind success!', res)
                if (res.data != 'no' && res.statusCode == 200) {
                    that.setData({
                        stuid: res.data.stuid,
                        name: res.data.name,
                        isbind: true
                    });
                    if (that.data.isbind) {
                        var stuinfomsg = [];
                        stuinfomsg.unshift(that.data.name);
                        stuinfomsg.unshift(that.data.stuid);
                        wx.setStorageSync('stuinfo',stuinfomsg);
                    }
                }
            },
            fail: function (res) {
                console.log('cbbind fail!--', res);
            }
        })
    },
    beiyong:function (params) {
         //测试区块链FISCO
         wx.request({
            url: 'http://120.25.123.46:7022/contract/kvrs/check',
            method:"POST",
            data:{
                "id":"wxid0",
                "imghash":"imghash"
            },
            header:{
              "content-type": "application/json"
            },success :function (res) {
                console.log('ok!',res);
            },fail:function (res) {
                console.log('error!',res);
            }
          } )
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    systeminfo: res
                });
            }
        });
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                console.log('get success 1!', res)
                that.setData({
                    userInfo: res.data
                })
            }
        });
        wx.getStorage({
            key: 'wxuid',
            success: function (res) {
                console.log('get success 2!', res)
                that.setData({
                    wxuid: res.data
                });
                if (that.data.wxuid && that.data.userInfo) {
                    console.log('onload read hasuserInfo');
                    that.setData({
                        hasUserInfo: true
                    })
                }
            }
        });
        try{
            var stuinfomsg = wx.getStorageSync('stuinfo');
            if(stuinfomsg){
                this.setData({
                    stuid : stuinfomsg[0],
                    name : stuinfomsg[1],
                    isbind : true
                })
            } 
            console.log('get S Sync 3 success!');
        }catch(e){
            console.log('getSSync error!');
        }
        if (!that.data.isbind && that.data.hasUserInfo) {
            that.cxbind();
        }
    },
    getusermsg: function () {
        var that = this;
        if (!this.data.hasUserInfo) {
            wx.showLoading({
                title: '加载中'
            });
            wx.login({
                success: function (res) {
                    console.log('code' + res.code);
                    //去后端得到openid
                    wx.request({
                        url: 'http://120.25.123.46/checkdb/get_userinfo',
                        data: {
                            'code': res.code
                        },
                        method: 'GET',
                        success: function (res) {
                            if(res.statusCode == 200){
                                console.log('openid_md5', res.data);
                                that.setData({
                                    wxuid: res.data,
                                    hasUserInfo: true
                                });
                                console.log('on cxbind--')
                                that.cxbind();
                                wx.hideLoading();
                                wx.showToast({
                                    title: '登录成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            }else{
                                wx.showModal({
                                    title: '提示',
                                    content: '登陆失败，网络或服务端出错，请稍后重试！',
                                    showCancel: false,
                                });
                            }
                        },
                        fail: function () {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: '登陆失败，网络或服务端出错，请稍后重试！',
                                showCancel: false,
                            });
                        },
                        complete: function () {
                            //获得用户信息以及wxuid后进行学号姓名绑定查询
                            //存储
                            if (that.data.hasUserInfo) {
                                wx.setStorage({
                                    key: 'userInfo',
                                    data: that.data.userInfo
                                });
                                wx.setStorage({
                                    key: 'wxuid',
                                    data: that.data.wxuid,
                                });
                            }
                        }
                    })
                }
            });
        }
    },
    getwxinfo: function () {
        var that = this;
        //首次需要获取用户信息
        console.log('on getuserprofile');
        wx.getUserProfile({
            desc: '完善个人信息',
            lang: 'zh_CN',
            success: function (res) {
                console.log('--获得用户信息，getuserprofile');
                that.setData({
                    userInfo: res.userInfo,
                });
                that.getusermsg();
            },
            fail: function () {
                console.log('--获得用户信息失败，getuserprofile');
                wx.showModal({
                    title: '提示',
                    content: '登陆失败，网络或服务端出错，请稍后重试！',
                    showCancel: false,
                });
            }
        })

    },
    gotoPage: function (e) {
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 500,
            success: function () {
                setTimeout(function () {
                    wx.navigateTo({
                        url: e.currentTarget.dataset.url
                    })
                }, 200);
            }
        });
    },
    //绑定学号界面/解除绑定
    stubind: function () {
        var that = this;
        if (!this.data.hasUserInfo) {
            wx.showToast({
                title: '请登录',
                icon: 'error',
                duration: 2000
            })
        }
        //绑定
        if (this.data.isbind == false && this.data.hasUserInfo) {
            wx.navigateTo({
                url: '../stubind/stubind',
            })
        } //解绑
        else if (this.data.isbind) {
            wx.showModal({
                title:'提示',
                content:'解绑将无法查看当前学号相关借条信息，是否确认解绑？',
                confirmColor:'#b22222',
                success : function (res) {
                    if(res.confirm){
                        that.gounbind();
                    }
                }
            })
        }
    },
    gounbind: function () {
        var that = this;
        wx.showLoading({
            title: '正在解绑',
        })
        wx.request({
            url: 'http://120.25.123.46/checkdb/gounbind',
            data: {
                'wxuid': that.data.wxuid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            method: "POST",
            success: function (res) {
                console.log('goinunbind--', res)
                wx.hideLoading()
                if (res.data == 'ok') {
                    that.setData({
                        stuid: '',
                        name: '',
                        isbind: false
                    });
                    if (!that.data.isbind) {
                        wx.removeStorage({
                            key: 'stuinfo',
                        });
                    }
                    wx.showToast({
                        title: '解绑成功',
                        icon: 'success',
                        duration: 2000,
                    })
                    console.log('unbind success!--')
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '解绑失败，网络或服务端出错，请稍后重试！',
                        showCancel: false,
                    });
                }
            },
            fail: function (res) {
                wx.hideLoading({
                    success: (res) => {
                        wx.showModal({
                            title: '提示',
                            content: '解绑失败，网络或服务端出错，请稍后重试！',
                            showCancel: false,
                        });
                    },
                })
            }
        })
    },
    //查询借条页面的跳转-->
    viewiou:function () {
        //需要两个flag！
        if (!this.data.wxuid) {
            wx.showModal({
                title: '提示',
                content: '请首先登陆以体验更多的功能',
                showCancel: false
            })
        } else if (!this.data.isbind) {
            wx.showModal({
                title: '提示',
                content: '请绑定学号以查看相关借条',
                showCancel: false
            })
        }
        wx.navigateTo({
          url: '../viewiou/viewiou',
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
    onPageScroll: function (res) {
        this.setData({
            pagescroll: res
        });
    },
    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },
    goourinfo:function () {
        wx.navigateTo({
            url: './aboutus',
        })
    },
    leave:function () {
        var that = this;
        wx.showModal({
          title:'提示',
          content:'退出将无法体验更多功能，是否确定退出？',
          success:function (res) {
              if(res.confirm){
                that.setData({
                    hasUserInfo : false,
                    isbind : false,
                    wxuid:'',
                    stuid:'',
                    name:'',
                    userInfo:''
                })
                wx.removeStorage({key: 'userInfo'})
                wx.removeStorage({key: 'wxuid'})
                wx.removeStorage({key: 'stuinfo'})
              }
          }
        })
    }
});