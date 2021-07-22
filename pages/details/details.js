import api from '../../http/api';
import utils from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    list: ['详情', '评价'],
    url: api.STATIC_HOST,
    id: "",
    details: {},
    score: 0,
    // 推荐
    recommend: [],
    start: 1,
    // 评论
    discuss: [],
    total: 0,
    append: "加入书架",
    imgList: [],
    show:false,
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
  //书籍详情
  getData() {
    api.bookInfo(this.data.id).then(res => {
      // console.log(res);
      let minute = res.rating.score
      this.data.imgList.push(this.data.details.cover)
      this.setData({
        details: res,
        score: parseInt(minute / 2),
        imgList: this.data.imgList
      })
      // console.log(this.data.score);
      setTimeout(() => {
        wx.hideLoading();
      }, 2000);
    }).catch(err => {
      console.log(err);
    })
  },
  //相关推荐
  correlation() {
    api.relatedRecommendedBooks(this.data.id).then(res => {
      // console.log(res);
      if (res.books.length < 3) {
        this.setData({
          recommend: res.books
        })
      } else {
        let a = Math.random() * (res.books.length - 1) + 1;
        let obj = res.books.slice(a, a + 3)
        this.setData({
          recommend: obj
        })
        // console.log(this.data.recommend);
        setTimeout(() => {
          wx.hideLoading();
        }, 2000);
      }
    }).catch(err => {
      console.log(err);
    })
  },
  // 换一换
  exchange() {
    wx.showLoading({
      title: '加载中...'
    });
    this.correlation()
  },
  goto(e) {
    // console.log(e.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.item._id}`
    })
  },
  // 评论
  comment() {
    api.shortReviews(this.data.id, this.data.start).then(res => {
      // console.log(res);
      this.setData({
        discuss: res.docs,
        list: ['详情', `评价(${res.total})`],
        total: res.total
      })
      // console.log(this.data.discuss);
    }).catch(err => {
      console.log(err);
    })
  },
  // 加入书籍
  join() {
    utils.saveHistory({
      key: "collect",
      data: this.data.details,
      attr: "_id"
    })
    this.setData({
      append: "已加入书架"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    });
    this.setData({
      id: options.id
    })
    // console.log(this.data.id);
    this.getData()
    this.correlation()
    this.comment()
    let arr = wx.getStorageSync("collectHistory");
    // 检测数据是否已经存在
    let item = null;
    if(arr){
      item = arr.find(i => {
        return i._id === this.data.id
      });
      if (!item) {
        this.setData({
          append: "加入书架"
        })
      } else {
        this.setData({
          append: "已加入书架"
        })
      }
    }
  },
  press() { //常按事件
    let img = this.data.url + this.data.details.cover
    wx.showActionSheet({
      itemList: ['保存图片'],
      success(res) {
        wx.downloadFile({ //下载
          url: img, //仅为示例，并非真实的资源
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({ //保存图片到相册
                filePath: res.tempFilePath,
                success(res) {
                  console.log(res.errMsg)
                }
              })
            }
          }
        })
      }
    })
  },
  preview(){
    this.setData({
      show:!this.data.show
    })
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
    // if (this.data.total > this.data.discuss.length) {
    //   this.data.start++
    //   this.setData({
    //     start: this.data.start
    //   })
    //   wx.showLoading({
    //     title: '加载中...'
    //   });
    //   this.comment()
    // }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})