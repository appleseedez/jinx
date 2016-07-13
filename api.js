import fetch from 'node-fetch'
// import fetch from 'whatwg-fetch'
import _ from 'lodash'
const Config = {
  "scheme":"http://",
  // "host":"10.0.0.8",
  "host":"api.shit0u.com",
  "port":88,
  "prefix":"/ad-api/lottery",
}
const Params = (obj)=>{
  if (!obj || _.size(obj) === 0) {
   return ''
 }
 return _.map(obj,(v,k)=>{
   return k+'='+encodeURIComponent(v)
 }).join('&')

}

const BuildURL = (config,url)=>{
  return config.scheme + config.host+':' + config.port + config.prefix+url
}
const API = {
  doPOST:(url,payload)=>{
    console.log(BuildURL(Config,url));
      // post
      const fetchCfg = {
        method:'post',
        headers:{ "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        credentials:'same-origin',
        body:Params(payload)
      }
      return fetch(BuildURL(Config,url),fetchCfg)
      .catch((err) => {
        console.log('网络错误:',err);
      })
  },
  doGET:(url,payload)=>{
    // get
  },
  index:(payload)=>{ //获取抽奖首页
    return API.doPOST('/lotteryPage',payload)
  },
  loot:(payload)=>{ // 调用抽奖 payload:{userId:1}
    return API.doPOST('/lotting',payload )
  },
  prizeList:(payload)=>{// 获取奖品列表 payload: {userId :1}
    return API.doPOST('/prize/list',payload)
  },
  mission:(payload)=>{// 获取用户任务完成情况 payload:{userId:1}
    return API.doPOST('/mission',payload)
  },
  checkIn:(payload)=>{
    return API.doPOST('/checkin',payload)
  }

}
export { API }
