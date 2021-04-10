const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},

    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      // { name: '分享海报', icon: 'poster' },
      // { name: '二维码', icon: 'qrcode' },
    ],
  },

  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
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