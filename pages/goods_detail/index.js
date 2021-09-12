import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详细信息
    goodsObj: {}
  },

  /**
   * 商品对象
   */
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  /**
   * 获取商品详细信息
   */
  async getGoodsDetail(goods_id) {
    const result = await request({
      url: '/goods/detail',
      methods: 'GET',
      data: {goods_id}
    })
    this.GoodsInfo = result
    this.setData({
      goodsObj: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,

        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.pics
      }
    })
  },

  /**
   * 图片点击预览
   */
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    }); 
   }
})