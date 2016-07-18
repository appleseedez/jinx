import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import GlobalConfig from '../config'
class CheckIn extends React.Component {
  render () {
    let self = this
    return (
      <div style={{height:'100%'}}>
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
            <p className="tip">您有<em>{this.props.params.residue || 0}</em>次抽奖机会</p>
            <p className="dk">在连续登录<em>{this.props.params.willDays || 0}</em>天获得<em>{this.props.params.willChances || 0}</em>次抽奖机会</p>
          </div>
          <div className="btn-box" onClick={()=>{ this.context.router.push('/index') }}> 
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