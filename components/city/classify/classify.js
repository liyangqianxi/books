// components/classify/classify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goto(e){
      // 存数据
      wx.setStorageSync('key', e.currentTarget.dataset)
      // 跳转
      wx.navigateTo({
        url:"/pages/subclassification/subclassification",
        // 动态绑定标题
        success:() => {
          let id =e.currentTarget.dataset.item.name
          wx.setNavigationBarTitle({
            title: id,
          })
        }
      })
      // console.log(e.currentTarget.dataset);
  }
  },
})
