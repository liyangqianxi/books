import api from '../../http/api';
import utils from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: api.STATIC_HOST,
    //搜索框的值
    value: "",
    // 图标显示
    show: false,
    // 搜索热词
    word: [],
    // 换一换热词
    hotspot: [],
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"
    ],
    //搜索后下面的框显示与隐藏
    search: true,
    // 分页
    // start:0,
    // 搜索到的
    shoopingarray: [],
    // 搜索历史
    gather: []
  },
  // 搜索请求
  bookSearch(){
    api.bookSearch(this.data.value).then(res => {
      // console.log(res);
      this.setData({
        shoopingarray: res.books
      })
      // console.log(this.data.shoopingarray);
      setTimeout(() => {
        wx.hideLoading();
      }, 2000)
    }).catch(err => {
      console.log(err);
    })

  },
  // 搜索回车
  search(e) {
    wx.showLoading({
      title: '加载中...'
    })
    if (e.detail.value.replace(/\s*/g, "")) {
      this.setData({
        search: false,
        value:e.detail.value
      })
      this.bookSearch()
      utils.saveHistory({
        key: "search",
        data: e.detail.value.trim(),
        attr: "name"
      })
    }
    this.setData({
      gather: wx.getStorageSync('searchHistory')
    })
    // console.log(e.detail.value, "回车");
  },
  // 点击搜索框
  input(e) {
    // console.log(e.detail.value);
    if (e.detail.value !== "") {
      this.setData({
        show: true
      })
    } else if (e.detail.value == "") {
      this.setData({
        search: true,
        show: false
      })
    }
  },
  // 删除搜索框的值
  cancel() {
    this.setData({
      value: "",
      show: false,
      search: true
    })
  },
  // 搜索热词
  hotWord() {
    api.hotWord().then(res => {
      // console.log(res);
      // let arr = res.hotWords.map((item,index,self) => {
      //   let num = Math.floor(Math.random()*res.hotWords.length)
      //   return res.hotWords[num]
      // })
      // console.log(arr);
      // let flag = true
      // for(let i in arr){
      //   for(let j in arr){
      //     if(i == j){
      //       flag =false
      //     }
      //   }
      // }
      this.setData({
        word: res.newHotWords,
      })
      this.switchover()
      // console.log( this.data.word);
      setTimeout(() => {
        wx.hideLoading();
      }, 2000);
    }).catch(err => {
      console.log(err);
    })
  },
  // 换一换
  switchover() {
    let arr = this.data.word
    for (let i = 0; i < arr.length + 4; i++) {
      let rdm = Math.floor(Math.random() * arr.length)
      arr.push(arr[rdm])
      arr.splice(rdm, 1)
    }
    let rdm = Math.floor(Math.random() * 8)
    // console.log(rdm);
    if (rdm == 0) {
      rdm = 1
    }
    let obj = this.data.word.slice(0, rdm)
    // console.log(obj);
    this.setData({
      hotspot: obj
    })
    // console.log(this.data.hotspot);
  },
  // 去详情
  onclick(e) {
    // console.log(e.currentTarget.dataset);
    // console.log(e.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.item._id}`
    })
  },
  // 点击搜索历史
  collect(e){
    // console.log(e.currentTarget.dataset.item);
    this.setData({
      search: false,
      show:true,
      value:e.currentTarget.dataset.item.name
    })
    utils.saveHistory({
      key: "search",
      data: this.data.value,
      attr: "name"
    })
    this.bookSearch()
    this.setData({
      gather: wx.getStorageSync('searchHistory')
    })
  },
  // 删除历史
  leave(){
    wx.setStorageSync('searchHistory', null)
    this.setData({
      gather: wx.getStorageSync('searchHistory')
    })
  },
  // 点击大家都在搜
  switchexchange(e){
    // console.log(e.currentTarget.dataset.v.word);
    this.setData({
      search: false,
      show:true,
      value:e.currentTarget.dataset.v.word
    })
    utils.saveHistory({
      key: "search",
      data: this.data.value,
      attr: "name"
    })
    this.bookSearch()
    this.setData({
      gather: wx.getStorageSync('searchHistory')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    });
    this.hotWord()
    // 随机颜色
    // let that = this
    // let labLen = that.data.hotspot.length
    // let colorArr = that.data.colorArr
    // let colorLen = colorArr.length
    // let randomColorArr = []
    // //判断执行
    // do {
    //   let random = Math.floor(Math.random() * colorLen);
    //   randomColorArr.push(random);
    //   labLen--;
    // } while (labLen > 0)
    // that.setData({
    //   randomColorArr: randomColorArr
    // })
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
      gather: wx.getStorageSync('searchHistory')
    })
    // console.log(this.data.gather);
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