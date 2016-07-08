import { API } from './api'
import Config from './config'

import express from 'express'

const app = express()

app.use('/static',express.static(__dirname+'/public'))


app.listen(8888,()=>{
  console.log('Starting server at 8888');
})


// //获取首页
// API.index({userId:1035})
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('index:',JSON.stringify(res,null,4)) })
//
// API.checkIn({userId:1035})
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('checkIn:',JSON.stringify(res,null,4)) })
//
// API.loot({ userId:1035 })
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('loot:',JSON.stringify(res,null,4)) })
//
// // API.prizeList({ userId:1035 })
// // .then(res=>{ return res.json() })
// // .then(res=>{ console.log('prizeList:',res) })
// //
// API.mission({ userId:1035 })
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('mission:',res) })
