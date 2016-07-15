import 'es6-promise'
import 'whatwg-fetch'
import _ from 'lodash'
const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
const Config = {
	'scheme': 'http://',
	'host':'192.168.31.72',  //'api.shit0u.com',
	'port':8082,//9527,
	'prefix': '/ad-api/lottery',
	'tokenPriveKey': 'an4@lx300#$o25#$',
	'xPrivateKey': '45ryu230a@n2x302',
	'signPrivateKey':'mIo98aiqing'
}
const Params = (obj) => {
	if (!obj || _.size(obj) === 0) {
		return ''
	}
	return _.map(obj, (v, k) => {
		return k + '=' + encodeURIComponent(v)
	}).join('&')

}

const BuildURL = (config, url) => {
	return config.scheme + config.host + ':' + config.port + config.prefix + url
}
const API = {
	aesGen: (pub, privateKey) => {
		if (!privateKey) {
			throw new Exception('无法加密,pk未提供')
		}
		
		let forge = null
		if(isBrowser()) {forge = window.forge}
		if (!isBrowser()) { forge = require('node-forge') }
		const key = forge.util.createBuffer(privateKey)
		const iv = forge.util.createBuffer('0312032293271340')
		const cipher = forge.cipher.createCipher('AES-CBC', key)
		cipher.start({ iv: iv })
		cipher.update(forge.util.createBuffer(pub))
		cipher.finish()
		let encrypted = cipher.output
		let priv = encodeURIComponent(new Buffer(encrypted.getBytes(), 'binary').toString('base64'))
		return priv
	},
	getToken: (pubToken) => {
		return API.aesGen(pubToken, Config.tokenPriveKey)
	},
	getX: (timestamp) => {
		return API.aesGen(timestamp, Config.xPrivateKey)
	},
	getSign :(url,pubToken) => {
		const md5 = require('md5')
		let sign = new Buffer(md5(Config.prefix+url+pubToken+Config.signPrivateKey)).toString('base64')
		return sign
	},
	doPOST: (url, payload) => {
		console.log('token,',store.get('token'))
		let fetch = null;
		if(isBrowser()){ fetch = window.fetch } 
		if(!isBrowser()){ fetch = require('node-fetch') }  
		// post
		const fetchCfg = {
			method: 'post',
			headers: {
				'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
				'userId':store.get('userId'),//'1035',
				'token':API.getToken(store.get('token')), //API.getToken('9df101bd-78cb-3e55-b416-a5aa23fd28aa'),
				'sign':API.getSign(url,store.get('token')),//API.getSign(url,'9df101bd-78cb-3e55-b416-a5aa23fd28aa'),
				'x':API.getX(new Date().getTime()+'')
			},
			credentials: 'same-origin',
			body: Params(payload)
		}
		return fetch(BuildURL(Config, url), fetchCfg).catch(err => console.log('网络错误:', err))
	},
	doGET: (url, payload) => {
		// get
	},
	index: (payload) => { //获取抽奖首页
		return API.doPOST('/lotteryPage', payload)
	},
	loot: (payload) => { // 调用抽奖 payload:{userId:1}
		return API.doPOST('/lotting', payload)
	},
	prizeList: (payload) => {// 获取奖品列表 payload: {userId :1}
		return API.doPOST('/prize/list', payload)
	},
	mission: (payload) => {// 获取用户任务完成情况 payload:{userId:1}
		return API.doPOST('/mission', payload)
	},
	checkIn: (payload) => {
		return API.doPOST('/checkin', payload)
	}

}
export { API }
