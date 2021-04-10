const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车商品
    carts: [],
    // 用户信息
    userInfo: {},
    // 收货地址
    address: {},
    //商品总价
    totalPrice: 0
  },

  // 用户登录
  login(e) {
    wx.getUserProfile({
      desc: "用户登录",
      success: res => {
        const userInfo = res.userInfo
        wx.cloud.callFunction({
          name: "login",
          success: res => {
            userInfo.openid = res.result.openid
            app.globalData.userInfo = userInfo
            wx.setStorageSync('userInfo', userInfo)
            this.onLoad()
          }
        })
      }
    })
  },

  // 选择收货地址
  handleChooseAddress() {
    wx.chooseAddress({
      success: res => {
        wx.setStorageSync('address', res)
        this.setData({
          address: res
        })
      }
    })
  },

  // 提交订单
  onClickButton() {
    // 如果没有选择收货地址先选择收货地址
    if (!this.data.address.userName) {
      this.handleChooseAddress()
    } else {
      const { userName, provinceName, cityName, countyName, detailInfo, telNumber } = this.data.address
      // 从云函数根据系统时间+5位数随机数随机生成订单号+获取下单时间
      wx.cloud.callFunction({
        name: "getDate"
      }).then(result => {
        let { order_no, order_time } = result.result
        //删除商品中的img和info
        this.data.carts.forEach(v => {
          delete v.img
          delete v.info
        })

        //获取成功将订单信息存到数据库
        db.collection("orders").add({
          data: {
            add_name: userName,
            tel: telNumber,
            address: provinceName + cityName + countyName + detailInfo,
            total_price: this.data.totalPrice,
            goods: this.data.carts,
            state: 0,
            order_no,
            order_time
          }
        })

        //提交完将本地购物车xin'si
        app.globalData.carts = []
        wx.reLaunch({
          url: '../order/index'
        })
      }).catch(err => {
        wx.showToast({
          title: '提交失败,请稍候重试',
          icon: 'none'
        })
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      carts: app.globalData.carts,
      userInfo: app.globalData.userInfo
    })
    const address = wx.getStorageSync('address')
    if (address) {
      this.setData({
        address
      })
    }
    const totalPrice = this.data.carts.reduce((prev, item) => {
      return prev + item.pcs * item.price
    }, 0)
    this.setData({
      totalPrice
    })

    // console.log(this.data.carts);
    // console.log(this.data.userInfo);
    // console.log(this.data.address);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})