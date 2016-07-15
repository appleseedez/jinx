import React, { PropTypes } from 'react'
import { Link } from 'react-router'
class LoginPop extends React.Component {
  render () {
    let self = this
    return (
      <div style={{height:'100%'}}>
        <div className="cover-layer-mq" />
        <div className="pop-box-mq">
          <span className="ico-close" onClick={()=>{window && window.activity && window.activity.finishActivity()}} />
          <div className="logo-box">
            <span className="ico-logo" />
          </div>
          <div className="pic-box">
            <img src="img/prize_pop/qd_pop.png" alt />
          </div>
          <div className="info-box">
            <p className="tip">您有<em>1</em>次抽奖机会</p>
            <p className="dk">在连续登录2天获得<em>1</em>次抽奖机会</p>
          </div>
          <div className="btn-box" onClick={()=>{ this.context.router.push('/index') }}> 
            <span>去抽奖</span>
          </div>
        </div>
      </div>

    )
  }
}

LoginPop.contextTypes = {
  router:React.PropTypes.object.isRequired
}

class VirtualPop extends React.Component {
  render () {
    let self = this
    return(
      <div style={{height:'100%'}}>
        <div className="cover-layer-mq" />
        <div className="pop-box-mq">
          <div className="logo-box">
            <span className="ico-logo" />
          </div>
          <div className="pic-box">
            <img src="img/prize_pop/520.png" alt />
          </div>
          <div className="info-box">
            <p className="tit cash">秒喵现金已到账</p>
            <p>发红包勾搭TA</p>
            <p>移驾单身市场</p>
            <p className="dk">我的-钱包中查看</p>
          </div>
          <div className="btn-box" onClick={this.props.closeFun}>
            <span>继续抽奖</span>
          </div>
        </div>
      </div>

    )
  }
}


class MaterialPop extends React.Component {
  render () {
    return (
      <div style={{height:'100%'}}>
        <div className="cover-layer-mq" />
        <div className="pop-box-mq">
          <div className="logo-box">
            <span className="ico-logo" />
          </div>
          <div className="pic-box">
            <img src={this.props.image || "img/prize_pop/tg.png" } alt />
          </div>
          <div className="info-box">
            <p className="tit">天啦噜，抽中<em>{ this.props.prizeName || '豪华泰国旅游' }</em>啦</p>
            <p>领奖要积极噢，请您三个工作日内联系客服</p>
            <p>电话：13518202113</p>
            <p className="dk">抽奖-我的奖品中查看</p>
          </div>
          <div className="btn-box" onClick={this.props.closeFun}>
            <span>继续抽奖</span>
          </div>
        </div>
      </div>
    )
  }
}

class Pop extends React.Component {
  render () {
    let component = null
    switch (this.props.params &&  this.props.params.type || this.props.popType) {
      case 'virtual':
        component = <VirtualPop {...this.props.data} closeFun={this.props.closeFun}/>
        break
      case 'checkIn':
        component =  <LoginPop {...this.props.data}/>
        break
      default:
        component = <MaterialPop {...this.props.data} closeFun={this.props.closeFun} />

    }
    return component
  }
}
Pop.defaultProps = {
  data:{}
}

export default Pop;
