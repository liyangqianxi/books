import api from '../../http/api';

// pages/subclassification/subclassification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: api.STATIC_HOST,
    selected: 0,
    selected1: 0,
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    // 存的数据
    son: [],
    male: [],
    // 性别
    gender: "",
    // 一级
    type: "",
    // 二级
    major: "",
    // 大类
    minor: "",
    // 分页
    start: 1,
    // 书籍
    book: [],
    total: 0
  },
  // 二级
  selected: function (e) {
    this.setData({
      book: []
    })
    let that = this
    // console.log(e.currentTarget.dataset.item)
    if (e.currentTarget.dataset.item == "全部") {
      this.setData({
        minor: null
      })
    } else {
      this.setData({
        minor: e.currentTarget.dataset.item
      })
    }
    this.getCatsBooks()
    // console.log(this.data.major);
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
    } else if (index == 2) {
      that.setData({
        selected: 2
      })
    } else if (index == 3) {
      that.setData({
        selected: 3
      })
    } else if (index == 4) {
      that.setData({
        selected: 4
      })
    } else if (index == 5) {
      that.setData({
        selected: 5
      })
    }else {
      that.setData({
        selected: 6
      })
    }
  },
  // 一级
  selected1: function (e) {
    this.setData({
      book: []
    })
    let that = this
    // console.log(e.currentTarget.dataset.item.id)
    that.setData({
      type: e.currentTarget.dataset.item.id
    })
    // console.log(this.data.type);
    this.getCatsBooks()
    let index = e.currentTarget.dataset.index
    //console.log("index",index)
    if (index == 0) {
      that.setData({
        selected1: 0
      })
    } else if (index == 1) {
      that.setData({
        selected1: 1
      })
    } else if (index == 2) {
      that.setData({
        selected1: 2
      })
    } else if (index == 3) {
      that.setData({
        selected1: 3
      })
    }else if (index == 4) {
      that.setData({
        selected1: 4
      })
    } else {
      that.setData({
        selected1: 5
      })
    }
  },
  // 获取小分类
  getMinor() {
    api.getMinor().then(res => {
      let arr = []
      // console.log(res,"xiaofenlei");
      if (this.data.son.item.gender === "male") {
        arr = res.male.filter(item => {
          return this.data.son.item.name == item.major
        })
      } else if (this.data.son.item.gender === "female") {
        arr = res.female.filter(item => {
          return this.data.son.item.name == item.major
        })
      }
      // console.log(arr[0].mins.length,"arr");
      if (arr[0].mins.length > 0) {
        arr[0].mins.unshift("全部")
      }
      this.setData({
        male: arr[0].mins,
      })
      //  console.log(this.data.male);
      setTimeout(() => {
        wx.hideLoading();
      }, 2000);
    }).catch(err => {
      console.log(err);
    })
  },
  // 书籍
  getCatsBooks() {
    api.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
      // console.log(res);
      this.setData({
        book: this.data.book.concat(res.books),
        total: res.total
      })
      setTimeout(() => {
        wx.hideLoading();
      }, 2000);
      // console.log(this.data.book);
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
    this.data.son = wx.getStorageSync("key")
    wx.showLoading({
      title: '加载中...'
    });
    this.getMinor()

    this.setData({
      gender: this.data.son.item.gender,
      type: this.data.typeList[0].id,
      major: this.data.son.item.name,
      minor: null
    })
    this.getCatsBooks()
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
    if (this.data.total > this.data.book.length) {
      this.data.start++
      this.setData({
        start: this.data.start
      })
      wx.showLoading({
        title: '加载中...'
      });
      this.getCatsBooks()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})