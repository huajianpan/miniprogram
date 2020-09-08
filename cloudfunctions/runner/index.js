
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
const todos=db.collection('todos')

exports.main = async (event, context) => {
  let date=new Date()
  let month=date.getMonth()+1
  let day=date.getDay()
  let year =date.getFullYear()
  let minute=date.getMinutes()
  let time=`${year}-${month}-${day} ${minute}:00`
  // 1. 筛选所有未完成的数据【当前时间来筛选】
  let tasks=await todos.where({
    status:'in-progress',
    time:time
  }).get()

  // 2. 执行数据的提醒
  for (let i = 0;  i < tasks.data.length;  i++) {
    await cloud.callFunction({
      name:'msgMe',
      data:{
        formId:tasks.data[i].formId,
        taskId:tasks.data[i]._id
      }
    })
    
  }




  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}