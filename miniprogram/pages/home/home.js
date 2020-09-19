// pages/home/home.js
// import Page from '../../common/page';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db=wx.cloud.database()
const UIHome=db.collection('UIHome')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch:false,
    tabs2: [1, 2],
    tabs3: [1, 2, 3],
    tabs4: [1, 2, 3, 4],
    tabs6: [1, 2, 3, 4, 5, 6],
    tabsWithName: [
      { name: 'a', index: 1 },
      { name: 'b', index: 2 },
      { name: 'c', index: 3 }
    ]
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
    console.log(1)  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    Toast('取消');
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
  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.index + 1} 已被禁用`,
      icon: 'none'
    });
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  onClickNavRight() {
    this.setData({
      isSearch:true
    })
    wx.showToast({
      title: '点击 right nav',
      icon: 'none'
    });
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  }
})