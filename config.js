const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
const GlobalConfig = {
  "PIC_PREFIX": "http://pic.miaoqutech.com/",
  "InvideFriends": "startInviteFriendsActivity",
  "ShareFriendsCircle": "startShareFriendsCircleActivity",
  "StartEditUserProfile": "startEditUserProfileActivity",
  "FinishActivity": "finishActivity",
  "Logout":"logout",
  callbackFacade:(name)=>{
    let funName = GlobalConfig[name] // 获取函数名称
    if(!isBrowser()) return ()=>{console.log('不是浏览器')}
    if(window && window.activity){
      return ()=>{
        window.activity[funName]()
      } 
    }else if(window && window.webkit && window.webkit.messageHandlers){
      return ()=>{ window.webkit.messageHandlers[funName].postMessage(name) }
    }else{
      return ()=>{console.log("兼容性问题")}
    }
  }
}

export default GlobalConfig
