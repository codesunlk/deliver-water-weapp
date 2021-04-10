// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { skip, state } = event

  const data = await db.collection("orders").limit(10).skip(skip)
    .where({ state }).orderBy("order_time", "desc").get()

  const count = await db.collection("orders").skip(skip)
    .where({ state }).orderBy("order_time", "desc").count()

  return {
    data,
    count
  }
}