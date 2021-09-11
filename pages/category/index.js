import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 一级菜单数据
    leftMenuList: [],
    // 商品数据
    rightContent: [],
    // 当前选中的菜单
    currentIndex: 0,
    // 右侧内容滚动条顶部距离
    scrollTop: 0
  },

  /**
   * 接口的返回数据
   */
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        const leftMenuList = this.Cates.map(item => item.cat_name)
        const rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  /**
   * 获取分类数据
   */
  async getCates() {
    const result = await request({
      url: '/categories',
      methods: 'GET'
    })
    this.Cates = result
      wx.setStorageSync("cates", {
        time: Date.now(), 
        data: this.Cates
      })
      const leftMenuList = this.Cates.map(item => item.cat_name)
      const rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
    })
  },

  /**
   * 菜单切换点击事件
   */
  handleItemTap(e) {
    const {index} = e.currentTarget.dataset
    const rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})