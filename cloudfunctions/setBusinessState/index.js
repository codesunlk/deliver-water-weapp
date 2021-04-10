// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { _id } = event

  if (event.state) {
    await db.collection("business")
      .where({ _id }).update({
        data: {
          state: event.state
        }
      })
  }

  if (event.note) {
    await db.collection("business")
      .where({ _id }).update({
        data: {
          note: event.note
        }
      })
  }

  if (event.phone) {
    await db.collection("business")
      .where({ _id }).update({
        data: {
          phone: event.phone
        }
      })
  }

  if (event.tel) {
    await db.collection("business")
      .where({ _id }).update({
        data: {
          tel: event.tel
        }
      })
  }

  return {

  }
}