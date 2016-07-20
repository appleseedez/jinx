import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import GlobalConfig from '../config'
class CheckIn extends React.Component {
  render () {
    let self = this
    let userId = encodeURIComponent(decodeURIComponent(this.props.params.userId)) 
    let token = encodeURIComponent(decodeURIComponent(this.props.params.token)) 
    let tokenPK = encodeURIComponent(decodeURIComponent(this.props.params.tokenPK)) 
    let signPK = encodeURIComponent(decodeURIComponent(this.props.params.signPK)) 
    let url = '/index/'+userId+'/'+token+'/'+tokenPK+'/'+signPK
    return (
      <div style={{height:'0%'}}>
        <div className="cover-layer-mq" />
        <div className="pop-box-mq">
          <span className="ico-close" onClick={()=>{GlobalConfig.callbackFacade('FinishActivity')()}} />
          <div className="logo-box">
            <span className="ico-logo" />
          </div>
          <div className="pic-box">
            <img src="img/prize_pop/qd_pop.png" alt />
          </div>
          <div className="info-box">
            <p className="tip">已获得<em>{this.props.params.residue || 0}</em>次抽奖机会</p>
           {
             (parseInt(this.props.params.willChances) >0) && (
               <p className="dk">再连续登录<em>{this.props.params.willDays || 0}</em>天获得<em>{this.props.params.willChances || 0}</em>次抽奖机会</p>
             )
           } 
          </div>
          <div className="btn-box" onClick={()=>{ this.context.router.push(url) }}> 
            <span>去抽奖</span>
          </div>
        </div>
      </div>

    )
  }
}

CheckIn.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default CheckIn;