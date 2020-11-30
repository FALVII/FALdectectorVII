// pages/camera/camera.js
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
  // 拍照上传
  takePhoto : function () {
    wx.createCameraContext().takePhoto({
      quality : 'high',
      success : res => {

        //缓存临时路径，在editor中检测此值
        wx.setStorageSync('camera-image-path', res.tempImagePath)
        this.hasPicture = true;
        this.setData({
          previewImagePath : res.tempImagePath//图像临时路径
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