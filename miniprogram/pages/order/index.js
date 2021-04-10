const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    steps: [
      {
        text: '已下单',
        // desc: '描述信息',
      },
      {
        text: '商家已接单',
        // desc: '描述信息',
      },
      {
        text: '配送中',
        // desc: '描述信息',
      },
      {
        text: '订单完成',
        // desc: '描述信息',
      },
    ],
    orderList: [],
    newOrderList:[],
    oldOrderList: []
  },

  //查询订单表
  query(skip = 0) {
    wx.showLoading({
      title: '加载中',
    })

    let { openid } = wx.getStorageSync('userInfo')
    /* 如果没有用户信息,openid为undefined,
    会在查询数据库时返回所有数据,所以先赋值为空字符串 */
    if (openid === undefined) {
      openid = ""
    }
    db.collection("orders").skip(skip).limit(10).where({
      _openid: openid
    }).orderBy("order_time", "desc").get().then(result => {
      // 当返回为空&&本地有订单数据时显示
      if (result.data.length == 0 && this.data.orderList.length > 0) {
        wx.showToast({
          icon: 'none',
          title: '无更多订单',
        })
      }
      // 将新请求的数据添加到orderList
      const orderList = this.data.orderList
      orderList.push(...result.data)
      const newOrderList = []
      newOrderList.push(orderList[0])
      const oldOrderList = []
      oldOrderList.push(...orderList.slice(1))
      this.setData({
        orderList,
        newOrderList,
        oldOrderList
      })
      console.log(this.data.newOrderList);
      wx.hideLoading({})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.query(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.query(this.data.orderList.length)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})




// wx.cloud.callFunction({
//   name: "getDate"
// }).then(res => {
//   const a = res.result.order_time.replace(/["\-"," ", ":"]/g,"")
//   const b = orderList[0].order_time.replace(/["\-"," ", ":"]/g,"")
//   //7000000
// })