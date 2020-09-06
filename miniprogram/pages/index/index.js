//index.js
const app = getApp()
const db = wx.cloud.database()
const todos = db.collection('todos')

Page({
  data: {
    tasks: []
  },
  pageData:{
    skip:0
  },
  onLoad: function (options) {
    this.getData(res => { })
  },

  onPullDownRefresh: function () {
    this.getData(res => {
      wx.stopPullDownRefresh()
      this.pageData.skip=0
    })
  },
  onReachBottom(event) {
    this.getData()
  },
  getData: function (callback) {
    if (!callback) {
      callback = res => { }
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData=this.data.tasks
      this.setData({
        tasks: oldData.concat(res.data)
      }, res => {
        this.pageData.skip+=12
        wx.hideLoading()
        callback()
      })
    })
  },
})
