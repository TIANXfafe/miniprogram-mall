const app = getApp()

Page({
  data: {
    // 轮播图
    swiperList: []
  },
  onLoad() {
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: 'GET',
      success: (result) => {
        console.log('result', result);
        this.setData({
          swiperList: result.data.message
        })
      }
    });
      
  }
})
