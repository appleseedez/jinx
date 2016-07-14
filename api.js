import fetch from 'node-fetch'
import _ from 'lodash'
const Config = {
	'scheme': 'http://',
	'host': 'api.shit0u.com',
	'port': 88,
	'prefix': '/ad-api/lottery',
	'tokenPriveKey': 'an4@lx300#$o25#$',
	'xPrivateKey': '45ryu230a@n2x302'
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
		const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
		if (!isBrowser()) {
			const forge = require('node-forge')
		} else {
			console.log('NODE');
		}
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
		return API.aesGen(timestamp, xPrivateKey)
	},
	doPOST: (url, payload) => {
		console.log(BuildURL(Config, url));
		// post
		const fetchCfg = {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			credentials: 'same-origin',
			body: Params(payload)
		}
		return fetch(BuildURL(Config, url), fetchCfg)
			.catch((err) => {
				console.log('网络错误:', err);
			})
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
