import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: api.STATIC_HOST,
    selected: 0,
    list: ['周榜', '月榜', '总榜'],
    obj: {},
    id: "",
    // 月榜
    month: "",
    // 总榜
    total: "",
    show: true,
    books:[]
  },
  //tab框
  selected: function (e) {
    let that = this
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    //console.log("index",index)
    if (index == 0) {
      that.setData({
        selected: 0,
        id: this.data.obj._id
      })
      wx.showLoading({
        title: '加载中...'
      })
      this.getData()
    } else if (index == 1) {
      that.setData({
        selected: 1,
        id: this.data.month
      })
      wx.showLoading({
        title: '加载中...'
      })
      this.getData()
    } else {
      that.setData({
        selected: 2,
        id: this.data.total
      })
      wx.showLoading({
        title: '加载中...'
      })
      this.getData()
    }
  },
  getData() {
    api.rankInfo(this.data.id).then(res => {
      // console.log(res);
      this.setData({
        books:res.ranking.books
      })
      setTimeout(() => {
        wx.hideLoading();
      }, 2000);
      console.log(this.data.books);
    }).catch(err => {
      console.log(err);
    })
  },
   // 点击去详情
   onclick(e) {
    // console.log(e.currentTarget.dataset);
    // console.log(e.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.item._id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      obj: wx.getStorageSync('notice')
    })
    this.setData({
      id: this.data.obj._id,
    })
    if (this.data.obj.title == "好评榜" || this.data.obj.title == "热搜榜") {
      this.setData({
        show: false
      })
    } else {
      this.setData({
        month: this.data.obj.monthRank,
        total: this.data.obj.totalRank
      })
    }
    this.getData()
    // console.log(this.data.obj);

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

  }
})