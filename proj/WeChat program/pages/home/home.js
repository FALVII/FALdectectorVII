// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   content : "你好呀"
    // });

    //await可以返回一个数值或者Promise对象
    // try{
    //   let res = await new Promise((rv,rj) => {
    //     wx.getNetworkType({
    //       success: (result) => {
    //         throw new Error('出错了');
    //         rv(result);
    //       },
    //       fail : err => {
    //         rj(err);
    //       }
    //     });
    //   });

    //   this.setData({
    //     networkType : result.networkType
    //   });
    // }catch(err){
    //   console.log(err.message)
    // }    //这个好像写的不太对

    // let net = new Promise((rv,rj) =>  {
    //   wx.getNetworkType({
    //     success: (result) => {
    //       rv(result);
    //     },
    //     fail : err => {
    //       rj(err);
    //     }
    //   })
    // })
    // net.then(result => {
    //   this.setData({
    //     networkType : result.networkType
    //   })
    // })
    wx.getNetworkType({
      success: (result) => {
        this.setData({
          connStat : result.networkType == 'none' ? '未连接' : '已连接',
          netType : result.networkType
        })
      },
    })
    wx.onNetworkStatusChange((result) => {
      this.setData({
        connStat : result.isConnected ? '已连接' : '未连接',
        netType: result.networkType
      })
    })
    wx.getBatteryInfo({
      success: (result) => {
        this.setData({
          level: result.level,
          charging:result.isCharging ? '正在充电' : '未充电'
        })
      },
    });

    let home_value = wx.getStorageSync('home-value');
    this.setData({
      inputInitValue: home_value
    });
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
  selectImage : function(){
    wx.chooseImage({
      count: 1,
      sizeType : ['original'],
      success : res => {
        this.setData({
          imagePath: res.tempFilePaths[0]
        })

        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'media',
          url: 'http://localhost:1234/img-check',
          success : res => {
            console.log(res.data);
          }
        })

        // wx.uploadFile({
        //   filePath: res.tempFilePaths[0],
        //   name: 'media',
        //   url: 'https://api.weixin.qq.com/wxa/img_sec_check?access_token=' + this.data.token,
        //   success : res => {
        //     console.log(res.data);
        //   }
        // })
      },
    })
  },
  contentSaveTime: 0,
  getInput : function(t){
    this.setData({
      inputContent: t.detail.value
    });

    let tm = Date.now();
    console.log(tm);
    
    if((this.contentSaveTime + 2000)>tm){
      return;
    }
    this.contentSaveTime = tm;

    //实时缓存表单输入
    wx.setStorageSync('home-value', encodeURIComponent(t.detail.value));
    console.log("获取输入：",t.detail.value);
  },

  gotoContent : function(f){
    console.log(f);
    //通过f.detail.value获取
    let vals = f.detail.value;

    wx.request({
      url: `https://wy.vvh5.com/man/${vals.content}`,
      dataType:'text',
      success : res => {
        if(res.statusCode != 200){
          wx.showModal({
            content:res.data
          });
        }else{
          this.setData({
            manResult:res.data
          });
        }
      }
    })
    // wx.navigateTo({
    //   url: `/pages/content/content?value=${encodeURIComponent(vals.content)}`,
    // })

    // wx.setStorageSync('home-value', encodeURIComponent(vals.content));

    // wx.switchTab({
    //   url: `/pages/content/content`,
    // })//不能传递参数到相应页面
  },
 
  savePoster: function() {
    var that = this    
    console.log(that.data.imagePath)
    wx.saveImageToPhotosAlbum({     
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              console.log('999999')
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function(res) {
            console.log(11111)
          }
        })
      },
      fail(res) {
        // wx.showToast({
        //   title: '保存失败',
        //   icon: 'none',
        // })
        if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
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
                      content: '获取权限成功,再次点击图片即可保存',
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
      }
    })
  }
})