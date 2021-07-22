// components/ranking/ranking.js
import imgurl from "../../../http/api"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:imgurl.STATIC_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goto(e){
      // console.log(e.currentTarget.dataset.item);
      wx.setStorageSync('notice', e.currentTarget.dataset.item)
      wx.navigateTo({
        url:"/pages/platoon/platoon",
        // 动态绑定标题
        success:() => {
          let id =e.currentTarget.dataset.item.title
          wx.setNavigationBarTitle({
            title: id,
          })
        }
      })
    }
  }
})
