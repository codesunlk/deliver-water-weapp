// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  function setTimeDateFmt(s) {  // 个位数补齐十位数
    return s < 10 ? '0' + s : s;
  }
  const now = new Date()
  console.log(now);
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let year = now.getFullYear().toString()
  month = setTimeDateFmt(month)
  day = setTimeDateFmt(day)
  hour = setTimeDateFmt(hour)
  minutes = setTimeDateFmt(minutes)
  seconds = setTimeDateFmt(seconds)
  let rod = parseInt(Math.random() * (99999 - 10000 + 1) + 10000, 10).toString();
  let order_no = year + month.toString() + day + hour + minutes + seconds + rod;

  const order_time = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
  console.log(order_time);

  return {
    order_no,
    order_time
  }
}