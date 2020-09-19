const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

const MAX_LIMIT = 100;

exports.main = async (event, context) => {
 //table 为必选值集合名称，sort1 和sort2 为可选值。
  // 1. 筛选所有未完成的数据【当前时间来筛选】
  //
  let filter={}
  event.filter&&(filter=event.filter)

  // 先取出集合记录总数
  const countResult = await db.collection(event.table).where(filter).count()
  // const countResult = await db.collection(event.table).count()
  const total = countResult.total
  
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)

  // 承载所有读操作的 promise 的数组
  let promiseArr = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(event.table).where(filter).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    // const promise = db.collection(event.table).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    promiseArr.push(promise)
  }

  // 等待所有
  return (await Promise.all(promiseArr)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}