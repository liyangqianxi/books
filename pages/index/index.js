import api from '../../http/api';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animation: {},
    url: api.STATIC_HOST,
    show: false,
    books: [],
  },
  compile() {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show == true) {
      this.act()
    } else if (this.data.show == false) {
      this.act()
    }
    console.log(this.data.show);

  },
  act() {
    // 1: 创建动画实例animation:
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    //  this.animation = animation
    let next = true;
    //连续动画关键步骤
    let timer = setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.translateX(4).step();
        animation.rotate(19).step()
        next = !next;
      } else {
        animation.translateX(-4).step();
        animation.rotate(-19).step()
        next = !next;
      }
      if (this.data.show == false) {
        clearInterval(timer)
        let next = true;
        if (next) {
          animation.translateX(0).step();
          animation.rotate(0).step()
          next = !next;
        } else {
          animation.translateX(0).step();
          animation.rotate(0).step()
          next = !next;
        }
        this.setData({
          animation: animation.export()
        })
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 300)
  },

  // 帮助
  aid() {
    wx.navigateTo({
      url: "/pages/assistance/assistance"
    })
  },
  // 删除
  cancel(e) {
    // console.log(e.currentTarget.dataset.index);
    let a = e.currentTarget.dataset.index
    this.data.books.splice(a, 1)
    this.setData({
      books: this.data.books
    })
    wx.setStorageSync('collectHistory', this.data.books)
    // console.log( this.data.books);
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
    this.setData({
      books: wx.getStorageSync('collectHistory')
    })

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