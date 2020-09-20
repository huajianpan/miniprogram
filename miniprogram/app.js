//app.js
import {UIHome} from './data/UIHome'
const sortObj={},sortArr=[]
UIHome.map((v,i)=>{
  sortObj[v.sort1]||(sortObj[v.sort1]=[])
  new Set(sortObj[v.sort1]).has(v.sort2)||(sortObj[v.sort1].push(v.sort2))
})
Object.keys(sortObj).forEach((v,index) => {
  // let arr=[]
  let obj={sort1:v,sort2:{}}
  for(let i in sortObj[v]){
    obj.sort2[sortObj[v][i]]=[]
    UIHome.forEach((val,key)=>{
      // console.log(val.sort2) 
      if(val.sort1==v&&val.sort2==sortObj[v][i])
      {
        val.cloudurl='cloud://js-o48yk.6a73-js-o48yk-1300096664/img/'+val.img.split('/').pop()
        obj.sort2[sortObj[v][i]].push(val)
      }
    })
  }
  sortArr.push(obj)
});
console.log(sortArr)
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      uiHomeList:UIHome,
      sortArr:sortArr
    }
  }
})
