//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    token :'38_HGUZzE8ED1F7JJfp6RguG2bVj6M1D5KKsaLdafhe0KZ5hYq7l1D4L1nlQZpM-d9wcZgZ5FQRZYn2fLMDtyo4CY3_9jm9nGuQtSCo-8_sMeFZLPJYUd1zrjfKos6D0kUQAciaVa3fP9nUvRt0DMSjAEAGPV',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {

    let imgList = await new Promise((rv,rj)=>{
      wx.request({
        url: 'https://wy.vvh5.com/image-list/2018011654',
        success:res=>{
          if(res.statusCode!==200){
            wx.showModal({
              content:`${res.statusCode}:出错了`
            });
            //抛出错误
            rj(new Error(`${res.statusCode} : 出错了`));
          }
          //输出结果
          //console.log(res.data);
          this.setData({
            list : res.data.data
          });
          //返回数组
          rv(res.data.data);
        }
      })
    });
    //删除所有图片
    let tmp = '';
    for(let i=0; i<imgList.length; i++){
      try {
        tmp = await new Promise((rv,rj)=>{
          wx.request({
            url : `https://wy.vvh5.com/image/2018011654/${imgList[i]}`,
            method : 'DELETE',
            success : res => {
              if(res.statusCode !== 200){
                rj( new Error(`${res.statusCode} : 删除失败`));
              }else{
                //直接抛出值
                rv(res.data)
              }
            }
          })
        })
        console.log(tmp);
      }catch(err){
        console.error(err.message);
      }
    }


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  myInfo : function () {
    wx.login({
      success : res => {
        console.log(res.code);
        wx.request({
          url: 'http://localhost:1234/oauth-login?code='+res.code,
          success : r => {
            console.log(r);
          }
        })
      },
      fail : err => {
        console.log(err);
      }
    })
    wx.getUserInfo({
      lang: 'zh_CN',
      success : res => {
        console.log(res);
        let uinfo = res.userInfo
        this.setData({
          myHeadImage : uinfo.avatarUrl
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  takePhoto : function (){
    wx.createCameraContext().takePhoto({
      quality : 'high',
      success : res =>{
        wx.compressImage({
          src: res.tempImagePath,
          quality : 50,
          success : r => {
            this.setData({
              compressImagePath : r.tempFilePath
            });
          }
        });
        
        this.setData({
          previewImagePath : res.tempImagePath
        });
      }
    })
  }
})

