import { request } from '../../request/index.js'

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    // 导航栏
    catesList: [],
    // 楼层
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  /**
   * 获取轮播图数据
   */
  getSwiperList() {
    request({
      url: '/home/swiperdata', 
      method: 'GET'
    })
    .then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  
  /**
   * 获取导航栏
   */
  getCateList() {
    request({
      url: '/home/catitems',
      method: 'GET'
    })
    .then(result => {
      this.setData({
        catesList: result
      })
    })
  },

  /**
   * 获取楼层数据
   */
  getFloorList() {
    request({
      url: '/home/floordata',
      method: 'GET'
    })
    .then(result => {
      this.setData({
        floorList: result
      })
    })
  }
})
