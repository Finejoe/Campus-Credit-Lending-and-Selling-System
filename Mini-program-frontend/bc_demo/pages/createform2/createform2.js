// pages/createform2/createform2.js
//画布相关
var app = getApp();
var context = null; // 使用 wx.createContext 获取绘图上下文
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth; //设备宽度
    canvash = res.windowHeight; //设备高度
  }
});


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
    brrowdate: '',
    dialog1: false, //弹窗显示
    imgpath0: '',
    imgpath1: '',
    imgpath: '', //最终的图片
    agreewp: false,
    wimg: 0,
    hideToast: false,
    toast: false,
    loading: false,
    upok: false,
    upblock : false,
    magicid :'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var nowdate = new Date();

    //修改上一页变量也可：prevPage
    this.setData({
        username1: prevPage.data.username1,
        username2: prevPage.data.username2,
        stuid1: prevPage.data.stuid1,
        stuid2: prevPage.data.stuid2,
        phonenum1: prevPage.data.phonenum1,
        phonenum2: prevPage.data.phonenum2,
        moneynum: prevPage.data.moneynum,
        infobk: prevPage.data.infobk,
        brrowdate: prevPage.data.date,
        brrowdateYear: nowdate.getFullYear(),
        brrowdateMonth: nowdate.getMonth() + 1,
        brrowdateDate: nowdate.getDate(),
      }),
      console.log(this.data.brrowdate)
    console.log(options)
    if (!this.data.moneynum || !this.data.phonenum1 || !this.data.phonenum2 || !this.data.stuid1 || !this.data.stuid2 || !this.data.brrowdate || !this.data.brrowdateYear || !this.data.brrowdateMonth || !this.data.brrowdateDate) {
      wx.showModal({
        title: '提示',
        content: '遇到错误，请重新进入！',
        showCancel: false,
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
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
  agreewitpro: function () {
    var tempagree = this.data.agreewp;
    tempagree = !tempagree;
    this.setData({
      agreewp: tempagree
    })
  },
  close: function () {
    this.setData({
      dialog1: false,
    });
  },
  open1: function () {
    if (this.data.agreewp == true && this.data.imgpath0 != '' && this.data.imgpath1 != '') {
      this.setData({
        dialog1: true
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请签名后确认！',
        showCancel: true,
      });
    }
  },
  gosignature0() {
    this.setData({
      wimg: 0
    })
    wx.navigateTo({
      url: '/pages/signature/signature',
    })
  },
  gosignature1() {
    this.setData({
      wimg: 1
    })
    wx.navigateTo({
      url: '/pages/signature/signature',
    })
  },
  drawText: function (ctx, str, leftWidth, initHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    var len = 0;
    if (str) {
      len = str.length;
    }
    for (let i = 0; i < len; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth >= canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 20; //16为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == len - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    console.log('draw text complete!')
  },
  uploaddata: function () {
    var that = this;
    var brrowdatetemp = that.data.brrowdateYear + '-' + that.data.brrowdateMonth + '-' + that.data.brrowdateDate;
    if (this.data.imgpath) {
      console.log('in upload --');
      wx.uploadFile({
        filePath: that.data.imgpath,
        name: 'brrowimg',
        url: 'http://120.25.123.46/ctdb/upload',
        header: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        formData: {
          name1: that.data.username1,
          name2: that.data.username2,
          stuid1: that.data.stuid1,
          stuid2: that.data.stuid2,
          phonenum1: that.data.phonenum1,
          phonenum2: that.data.phonenum2,
          moneynum: that.data.moneynum,
          brrowbackdate: brrowdatetemp,
        },
        success: function (res) {
          console.log('upload sucess!', res);
          //这里上传成功则整个流程完成！可以跳到下一页
          //还有一个问题，返回500，服务器后端出错！
          that.setData({
            loading : false
          })
          if (res.statusCode == 200) {
            that.setData({
              toast: true,
              upok: true,
            });
            if(res.data != "block"){
              that.setData({
                upblock : true,
                magicid : res.data,
              })
            }
            setTimeout(() => {
              that.setData({
                hideToast: true
              });
              setTimeout(() => {
                that.setData({
                  toast: false,
                  hideToast: false,
                });
              }, 1000);
            }, 2000);
          }
        },
        fail: function (res) {
          console.log('upload error!---', res);
          that.setData({
            loading: false
          });
          wx.showModal({
            title: '提示',
            content: '借条上传失败，请检查网络后重试！',
            showCancel: false,
          });
        },
        complete: function (res) {
          console.log('upload over!---');
          if (that.data.imgpath && that.data.upok && res.statusCode == 200) {
            wx.navigateTo({
              url: '../createover/createover',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '服务器出错，请稍后重试！',
              showCancel: false,
            });
          }
        }
      })
    }
  },

  createImg: function () {
    var that = this;
    var bgpath = '../../resources/images/iouimg.jpg';
    const ctx = wx.createCanvasContext('mycanvas');
    var text = '今借款人' + this.data.username1 + '（学号:' + this.data.stuid1 + '），向出借人' + this.data.username2 + '（学号:' + this.data.stuid2 + '）借款' + this.data.moneynum + '元。借款余额定于' + this.data.brrowdateYear + '年' + this.data.brrowdateMonth + '月' + this.data.brrowdateDate + '日前还清。'
    console.log(text);
    //绘制背景
    ctx.drawImage(bgpath, 0, 0, 350, 560);
    //首先是标题
    ctx.font = '32px sans-serif';
    ctx.fillStyle = 'Black';
    ctx.fillText('借条', 143, 120);
    //文本
    ctx.font = '15px sans-serif';
    this.drawText(ctx, text, 17, 180, 315);
    var nowhight = 260;
    //如果有的话，写备注：
    if (this.data.infobk) {
      ctx.font = 'oblique lighter 15px sans-serif';
      ctx.fillText('备注：', 17, nowhight);
      this.drawText(ctx, this.data.infobk, 17, nowhight + 20, 315);
      nowhight += 120;
    }
    //个人签字部分
    ctx.font = '15px sans-serif';
    ctx.fillText('借款人', 25, nowhight);
    ctx.fillText('出借人', 175, nowhight);
    //又要画图了！ 
    console.log('begin to create img!');
    ctx.drawImage(this.data.imgpath0, 30, nowhight + 20, 50, 80);
    ctx.drawImage(this.data.imgpath1, 200, nowhight + 20, 50, 80);

    ctx.draw(false, () => {
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            console.log("canvasToTempFilePath ok --", res);
            var tempFilePath = res.tempFilePath;
            //跳到成功页面，并且清空页面栈  
            that.setData({
              imgpath: tempFilePath
            })
            that.uploaddata()
          },
          fail: function (res) {
            that.setData({
              loading: false
            });
            console.log('error to create temp img!', res)
            wx.showModal({
              title: '提示',
              content: '借条生成失败，请重试！',
              showCancel: false,
            });

          },
          complete: function (res) {
            console.log('create img complete!');
          }
        })
      }, 500)
    })
  },
  //这里需要生成借条图
  //将所有数据上传，然后后退或直接到首页去！
  gotocreatepro: function () {
    //得到临时文件路径
    this.setData({
      loading: true,
      dialog1: false
    })
    if (!this.data.imgpath) {
      this.createImg();
    } else {
      this.uploaddata();
    }
  }
})