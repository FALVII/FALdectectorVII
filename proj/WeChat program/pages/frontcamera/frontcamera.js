// pages/frontcamera/frontcamera.js
Page({
  //  页面的初始数据
  data: {

  },
  takePhoto : function () {
    // 微信相机组件wx.createCameraContext()
    wx.createCameraContext().takePhoto({
      quality : 'high',
      success : res => {
        //缓存临时路径，在editor中检测此值
        wx.setStorageSync('camera-image-path', res.tempImagePath)
        this.hasPicture = true;
        this.setData({
          previewImagePath : res.tempImagePath
        })
      }
    })
  },
  hasPicture : false,
  okPicture : function () {
    if(this.hasPicture){
      wx.navigateBack()
    }
  },
})