// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  edit:null,
  onLoad: function (options) {
    let ctx = wx.createSelectorQuery();
    ctx.select('#my-editor').context(res => {
      this.edit = res.context;
      this.edit.insertImage({
        src : 'https://wy.vvh5.com/randimg?rand=4'
      });
    }).exec();
  },
  insertImage : function(){
    wx.chooseImage({
      count: 1,
      sizeType : ['original'],
      success : res => {
      //   this.edit.insertImage({
      //     src: res.tempFilePaths[0]
      //   })
      // }
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'image',
          url: 'https://wy.vvh5.com/image/2018011654',
          success : r => {

            if(r.statusCode != 200) {
              wx.showModal({
                title : r.statusCode,
                content : '请求失败'
              });
              return
            }
            let ret = JSON.parse(r.data);
            if(ret.status === 'OK'){
              this.edit.insertImage({
                src : `https://wy.vvh5.com/image/2018011654/${ret.data}`
              })
            }else{
              wx.showModal({
                title:ret.data
              });
            }
          }
        })
      }
    })  
  },
  // 撤销
  editorUndo : function(){
    this.edit.undo();
  },
  // 删除
  editorRedo : function(){
    this.edit.redo();
  },
  // 拍照
  editorCamera : function(){
    wx.navigateTo({
      url: '/pages/camera/camera',//跳转到camera界面
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  // 展示相机所拍图像
  onShow: function () {
    let cameraImage = wx.getStorageSync('camera-image-path');
    if(cameraImage && this.edit){
      this.edit.insertImage({
        src : cameraImage
      })
      wx.removeStorageSync('camera-image-path');
    }
  },

  // 表单
  previewData : function (f) {
    let vals = f.detail.value;
    this.edit.getContents({
      success : res => {
        wx.setStorageSync('preview-content', {
          title : vals.title,
          content : res.html
        });
        // 跳转到content界面
        wx.switchTab({
          url: '/pages/content/content',
        })
      }
    })
  },
})