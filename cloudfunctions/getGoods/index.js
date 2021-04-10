// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { skip } = event

  const data = await db.collection("goods").limit(10).skip(skip).get()

  return {
    data
  }
}