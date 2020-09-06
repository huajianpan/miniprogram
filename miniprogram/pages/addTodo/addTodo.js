// pages/addTodo/addTodo.js
const db=wx.cloud.database()
const todos=db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:null,
    image:null
  },
  pageData:{
    locationObj:{}
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
  selectImg(){
    wx.chooseImage({
      count: 0,
      success:res=>{
        console.log(res)
        wx.cloud.uploadFile({
          cloudPath:Math.floor(Math.random()*1000000)+'.png',
          filePath:res.tempFilePaths[0]
        }).then(res=>{
          console.log(res.fileID)
          this.setData({
            image:res.fileID
          })
        }).catch(err=>{
          console.error(err)
        })
      }
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      latitude: 0,
      success:res=>{
        console.log(res)
        let locationObj={
          latitude:res.latitude,
          longitude:res.longitude,
          name:res.name,
          address:res.address
        }
        this.pageData.locationObj=locationObj
      }
    })
  },
  onSubmit:function(event){
    console.log(event)

    todos.add({
      data:{
        title:event.detail.value.title,
        image:this.data.image,
        location:this.pageData.locationObj
      }
    }).then(res=>{
      console.log(res._id)
      wx.cloud.callFunction({
        name:'msgMe',
        data:{
          formId:event.detail.formId,
          taskId:res._id //add 插入数据后返回的索引
        }
      }).then(console.log)

      wx.showToast({
        title: '已提交',
        icon:'success',
        success:res2=>{
          wx.redirectTo({
            url: '../todoInfo/todoInfo?id='+res._id,
          })
        }
      })
    })

  }
})