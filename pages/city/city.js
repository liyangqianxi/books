import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    list: ['分类', '排行'],
    // 女生
    female:[],
    // 男生
    male:[],
    // 出版
    press:[],
    // 排行数据男生
    arr1:[],
    // 排行数据女生
    arr2:[]
  },
//tab框
selected: function (e) {
  let that = this
  //console.log(e)
  let index = e.currentTarget.dataset.index
  //console.log("index",index)
  if (index == 0) {
    that.setData({
      selected: 0
    })
  } else if (index == 1) {
    that.setData({
      selected: 1
    })
  } else {
    that.setData({
      selected: 2
    })
  } 
},
// 获取大分类
getData(){
  api.getCats().then(res => {
    // console.log(res);
    res.female.map(item => {
      item.gender="female"
    })
    res.male.map(item => {
      item.gender="male"
    })
    res.press.map(item => {
      item.gender="press"
    })
    if(res.ok===true){
      this.setData({
        female: res.female,
        male: res.male,
        press: res.press
      })

      // console.log(this.data.female,this.data.male,this.data.press);
      // console.log(this.data.press);
      setTimeout(() => {
        wx.hideLoading();
    }, 2000);
    }
  }).catch(err => {
    console.log(err);
  })
},
// 排行
rankCategory(){
  api.rankCategory().then(res => {
    // console.log(res);
    res.female.map(item => {
      item.gender="female"
    })
    res.male.map(item => {
      item.gender="male"
    })

    let list2 =res.female.slice(0,6)
    let list1 = res.male.slice(0,6)
    this.setData({
      arr2: list2,
      arr1: list1,
    })
  }).catch(err => {
    console.log(err);
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
  });
  this.getData()
  this.rankCategory()
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