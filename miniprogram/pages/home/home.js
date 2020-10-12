// pages/home/home.js
// import Page from '../../common/page';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
// const db=wx.cloud.database()
// const UIHome=db.collection('UIHome')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch:false,
    tabs6: [1, 2, 3, 4, 5, 6],
    sortArr:getApp().globalData.sortArr,
    uiList:getApp().globalData.uiHomeList,
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad:async function (options) {
    // let res= await wx.cloud.callFunction({
    //   name:'getList',
    //   data:{
    //     table:'UIHome',
    //    filter:{
    //      key:value,
    //      key:value...//可选值
    //    }
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // Toast('取消');
    
    
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

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
  },

  onClickNavRight() {
    this.setData({
      isSearch:!this.data.isSearch
    })
    // wx.showToast({
    //   title: '点击 right nav',
    //   icon: 'none'
    // });
  },

  onClick(event) {
    // wx.showToast({
    //   title: `点击标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
  },
  copyUrl(e){
    // console.log( e.currentTarget.dataset)
    wx.setClipboardData({
      data: e.currentTarget.dataset.item.link,
      success (res) {
        wx.showToast({
          title: '链接复制成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  /**
   * @description 展开折叠内容
   */
  shiftFold(e){
    e.currentTarget.dataset.item.isShowList=false
    let index1=e.currentTarget.dataset.index1
    let index2=e.currentTarget.dataset.i2

    this.data.sortArr[index1].sort2[index2][0].isShowList=this.data.sortArr[index1].sort2[index2][0].isShowList?false:true
    this.setData({
      sortArr:this.data.sortArr
      // sortArr:Object.assign({},this.data.sortArr)
    })
  }
})