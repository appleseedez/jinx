import { API } from './api'
import Config from './config'

import express from 'express'

const app = express()
import favicon from 'serve-favicon'
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use('/static',express.static(__dirname+'/build'))




app.listen(9999,()=>{
  console.log('Starting server at 9999');
})


// console.log(API.getToken('ef180bbe-d8c7-3255-9883-59b3fb89e408'));

// //获取首页
// API.index({userId:1035})
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('index:',JSON.stringify(res,null,4)) })
//
// API.checkIn({userId:1035})
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('checkIn:',JSON.stringify(res,null,4)) })
//
// API.loot({ userId:1034 })
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('loot:',JSON.stringify(res,null,4)) })

// API.prizeList({ userId:1034 })
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('prizeList:',JSON.stringify(res,null,4)) })

// API.mission({ userId:1035 })
// .then(res=>{ return res.json() })
// .then(res=>{ console.log('mission:',res) })
