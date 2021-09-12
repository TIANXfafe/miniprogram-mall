import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏数据
    tabs: [{
      id: 0,
      value: '综合',
      isActive: true
    }, {
      id: 1,
      value: '销量',
      isActive: false
    }, {
      id: 2,
      value: '价格',
      isActive: false
    }],
    // 商品列表
    goodsList: []
  },

  /**
   * 接口需要参数
   */
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 总页数
   */
  TotalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.QueryParams.pagenum >= this.TotalPage) {
      wx.showToast({
        title: '没有下一页数据'
      });
        
    } else {
      this.QueryParams.pagenum ++
      this.getGoodsList()
    }
  },

  /**
   * 获取商品列表
   */
  async getGoodsList() {
    const result = await request({
      url: '/goods/search',
      methods: 'GET',
      data: this.QueryParams
    })
    const total = result.total
    this.TotalPage = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },

  /**
   * 标题点击事件
   */
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v, i) => index === i ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  }
})