// miniprogram/pages/login/login.js
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:''
  },
  inputChange(e){
    console.log(e)
    this.setData({
      name:e.detail.detail.value
    })
  },
  passwordChange(e){
    this.setData({
      password:e.detail.detail.value
    })
  },
  handleClick(){

  },
  bindGetUserInfo: function(e) {
    console.log(e,1)
    let that = this
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          db.collection('user').add({
            // data 字段表示需新增的 JSON 数据
            data: {
                country:e.detail.userInfo.country,
                city:e.detail.userInfo.city,
                gender:e.detail.userInfo.gender,
                nickName:e.detail.userInfo.nickName,
                province:e.detail.userInfo.province,
                userName:that.data.name,
                password:that.data.password
            },
            success: function(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              wx.navigateTo({
                url: '../index/index',
              })
            }
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          // wx.navigateTo({
          //   url: '../deployFunctions/deployFunctions',
          // })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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