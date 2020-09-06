
// 云函数入口文件
const cloud = require('wx-server-sdk')

const {
  WXMINIUser,
  WXMINIMessage
}=require('wx-js-utils');

const appId='wxfbb9e039e72d8f19'
const secret='b0dca342d9925a308e13316f90b5fece'
const template_id='EIofnB-KS98uhAefhGOXw76B06by106knQfcy0-KWBg' //模板消息ID

cloud.init()
const db=cloud.database()
// const db=wx.cloud.database() 错云函数客户端 wx.  服务端不需要wx.
const todos=db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  
  let wXMINIUser=new WXMINIUser({
    appId,
    secret
  })
  
  let access_token=await wXMINIUser.getAccessToken()
  
  const touser=wxContext.OPENID
  const form_id=event.form_id  //小程序表单的form_id  调用该云函数传入的值
  let task1=await todos.doc(event.taskId).get()

  // return task1

  let wXMINIMessage=new WXMINIMessage()

  let result=await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data:{
      character_string2:{
        value:task1.data.title
      },
      phrase1:{
        value:task1.data.title
      },
      date4:{
        value:task1.data.title
      },
      thing5:{
        value:task1.data.title
      }
    },
    page:'pages/todoInfo/todoInfo'+task1.data._id //点击模板消息后跳转的页面
  })
  return result
}

