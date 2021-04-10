const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商家信息
    business: {
      // 手机号
      phone: "",
      // 座机号
      tel: "",
      // 营业状态 100-营业中 200-打样 300-休假
      state: 100,
      note: ""
    },
    //顶部图片
    yingyeshijian: "http://39.96.189.1/yingyeshijian.png",
    //左侧分类数据
    leftMenuList: [],
    //左侧分类索引
    activeKey: 0,
    //右侧商品数据
    rightContent: []
  },

  // 商品数据
  Goods: [],

  // 提交订单
  handleOrder() {
    if (app.globalData.carts.length === 0) {
      wx.showToast({
        title: '请先添加商品',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../cart/index',
      })
    }
  },

  //点击右侧按钮添加商品
  onChangeStepper(e) {
    const { item } = e.currentTarget.dataset
    const rightContent = this.data.rightContent
    rightContent.forEach(v => {
      if (v.name == item.name) {
        v.pcs = e.detail
      }
    })
    const i = app.globalData.carts.findIndex(v => v.name == item.name)
    if (i > -1) {
      //如果e.detail为0,则删除掉购物车中对应的商品
      if (e.detail === 0) {
        app.globalData.carts.splice(i, 1)
      } else {
        app.globalData.carts[i].pcs = e.detail
      }
    } else {
      item.pcs += 1
      app.globalData.carts.push(item)
    }
    this.setData({
      rightContent
    })
  },

  //点击左侧商品分类切换显示商品
  onChangeSidebar(e) {
    this.setData({
      rightContent: this.Goods[this.data.leftMenuList[e.detail]]
    })
  },

  //拨打手机号
  handleTel1() {
    wx.makePhoneCall({
      phoneNumber: '15525605553'
    })
  },

  //拨打座机号
  handleTel2() {
    wx.makePhoneCall({
      phoneNumber: '03534358688'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 往数据库添加商品数据
    // db.collection('goods').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: this.Goodss
    // })
    //   .then(res => {
    //     console.log(res)
    //   })

    // 页面加载时从数据库获取商家信息
    db.collection("business").get().then(result => {
      this.setData({
        business: result.data[0]
      })
    })

    // 页面加载时从数据库获取商品信息并赋值给leftMenuList, Goods
    db.collection("goods").get().then(result => {
      const leftMenuList = Object.keys(result.data[0]).filter(v => {
        return v != "_id" && v != "_openid"
      })
      this.Goods = result.data[0]
      this.setData({
        leftMenuList
      })

      // 页面加载默认显示桶装水商品
      const name = "桶装水"
      const activeKey = this.data.leftMenuList.findIndex(v => v == name)
      this.setData({
        rightContent: this.Goods[name],
        activeKey
      })
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

// 商品
  // Goods: [
  //   // 桶装水
  //   [
  //     {
  //       name: "纯净水",
  //       info: "18.9L",
  //       price: "8",
  //       pcs: 0,
  //       img: "../../../../img/chunjingshui.jpg"
  //     },
  //     {
  //       name: "矿物质水",
  //       info: "18L",
  //       price: "10",
  //       pcs: 0,
  //       img: "../../../../img/kuangwuzhishui.jpg"
  //     },
  //     {
  //       name: "蛋白水",
  //       info: "18.9L",
  //       price: "12",
  //       pcs: 0,
  //       img: "../../../../img/danbaishui.jpg"
  //     }
  //   ],
  //   // 水桶
  //   [
  //     {
  //       name: "小桶7.5L(空桶)",
  //       info: "请在订水时搭配下单,如需单送需3元配送费",
  //       price: "25",
  //       pcs: 0,
  //       img: "../../../../img/xiaotong.png"
  //     }
  //   ],
  //   // 压水器
  //   [
  //     {
  //       name: "压水器",
  //       info: "请在订水时搭配下单,如需单送需3元配送费",
  //       price: "10",
  //       pcs: 0,
  //       img: "../../../../img/yashuiqi.jpg"
  //     }
  //   ],
  // ],

  // Goodss: {
  //   "桶装水": [
  //     {
  //       name: "纯净水",
  //       info: "18.9L",
  //       price: "8",
  //       pcs: 0,
  //       img: "../../../../img/chunjingshui.jpg"
  //     },
  //     {
  //       name: "矿物质水",
  //       info: "18L",
  //       price: "10",
  //       pcs: 0,
  //       img: "../../../../img/kuangwuzhishui.jpg"
  //     },
  //     {
  //       name: "蛋白水",
  //       info: "18.9L",
  //       price: "12",
  //       pcs: 0,
  //       img: "../../../../img/danbaishui.jpg"
  //     }
  //   ],
  //   "水桶": [
  //     {
  //       name: "小桶7.5L(空桶)",
  //       info: "请在订水时搭配下单,如需单送需3元配送费",
  //       price: "25",
  //       pcs: 0,
  //       img: "../../../../img/xiaotong.png"
  //     }
  //   ],
  //   "压水器": [
  //     {
  //       name: "压水器",
  //       info: "请在订水时搭配下单,如需单送需3元配送费",
  //       price: "10",
  //       pcs: 0,
  //       img: "../../../../img/yashuiqi.jpg"
  //     }
  //   ],
  // },
