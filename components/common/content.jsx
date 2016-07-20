import React, { PropTypes } from 'react'
import _ from 'lodash'
import GlobalConfig from '../../config'
import { API } from '../../api'
import Loading from './loading.jsx'
class Explain extends React.Component {

  render () {
    return (
      <dl className="explain-mq">
        <dt>
          <p>一、获得更多的抽奖机会：</p>
        </dt>
        <dd>
          <span className="num">1、</span>
          <p>新用户注册：</p>
          <p>自动获得一次抽奖</p>
        </dd>
        <dd>
          <span className="num">2、</span>
          <p>邀请好友：</p>
          <p>好友注册时邀请码输入您的妙喵ID</p>
          <p>两人分别获得一次抽奖</p>
        </dd>
        <dd>
          <span className="num">3、</span>
          <p>分享朋友圈：</p>
          <p>获得一次抽奖（每位用户最多二次）</p>
        </dd>
        <dd>
          <span className="num">4、</span>
          <p>完善资料：</p>
          <p>资料完整度100%，同时上传8张头像，限首次可获得一次抽奖</p>
        </dd>
        <dd>
          <span className="num">5、</span>
          <p>连续登录：</p>
          <p>3天获得一次抽奖机会</p>
          <p>7天获得二次抽奖机会(最多)</p>
        </dd>
        <dt>
          <p>二、为保证本次抽奖公开、公平、公正，说明如下：</p>
        </dt>
        <dd>
          <span className="num">1、</span>
          <p>同一手机号，妙喵ID号手机终端均视为同一用户。</p>
        </dd>
        <dd>
          <span className="num">2、</span>
          <p>活动期间，未使用的抽奖机会可以累积，活动结束后，抽奖机会自动失效。</p>
        </dd>
        <dd>
          <span className="num">3、</span>
          <p>领奖唯一身份认证标识为注册妙喵时手机号码。</p>
        </dd>
        <dd>
          <span className="num">4、</span>
          <p>抽中实物奖品后，请于三个工作日内主动联系客服，否则视为主动放弃本次奖品。实物奖品自中奖之日起1个月内有效。逾期作废。</p>
        </dd>
        <dd>
          <span className="num">5、</span>
          <p>欢乐谷门票(夜场)可申请兑换成30元妙喵现金和VIP二个月。兑换之后不再享有原欢乐谷门票（夜场）。</p>
        </dd>
        <dd>
          <span className="num">6、</span>
          <p>公司有权对抽奖形式和奖品进行适当调整。</p>
        </dd>
        <dd>
          <span className="num">7、</span>
          <p>谢绝任何以中奖为目的的恶意注册，如经发现，取消中奖资格。</p>
        </dd>
        <dd>
          <span className="num">8、</span>
          <p>因活动参与者没有仔细阅读活动规则等造成的损失和后果，须由本人承担。</p>
        </dd>
        <dd>
          <span className="num">9、</span>
          <p>其他未尽事宜以活动主办方解释为准。</p>
        </dd>
        <dd>
          <span className="num">10、</span>
          <p>本次活动与苹果公司无关。</p>
        </dd>
        <dt>
          <p>三、联系客服：</p>
        </dt>
        <dd>
          <p>如有疑问，请联系客服：</p>
          <p>“我的-设置-帮助与反馈”</p>
          <p>电话：028-86134618</p>
          <p>邮箱：yunying@miaoqutech.com</p>
        </dd>
      </dl>
    )
  }
}

class PrizeList extends React.Component {
  render () {
    if (0 === _.size(this.props.data) ) {
      return (
        <div className="empty-mq">
          <div className="ico-empty" />
          <p>妙喵，还没有获得任何奖品</p>
          <p>快去大转盘抽奖，不中奖你来打我</p>
        </div>
      )
    }
    return (
      <ul className="prize-list-mq">
        <li className="prize-item">
          <div className="hd">
            <h2>领奖说明</h2>
          </div>
          <div className="bd">
            <p>如何奖品：实物奖品请于中奖之日起3个工作日内联系客服；其他奖品已自动入账</p>
            <p>客服电话：028-86134618&nbsp;&nbsp;&nbsp;&nbsp;13518202113</p>
          </div>
        </li>
        {
          _.map(this.props.data,(v,k)=>{
            return (
              <li key={k} className="prize-item">
                <div className="hd">
                  <div className="prize-box">
                    <span className="num">{v.amount>1?'x'+v.amount:''}</span>
                    <div className="pic">
                      <img src={v.prizeImage?GlobalConfig.PIC_PREFIX + v.prizeImage + '-adsmall':"img/prize_thu/hlg.png-adsmall"} alt />
                    </div>
                    <div className="info">
                      <p className="name">{v.prizeName || 'GIFT'}</p>
                    <p className="brief">{v.comment || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="bd">
                  <span className={v.received?"status dk":"status"}>{v.received?(v.virtual?'已到账':'已领取'):'未领取'}</span>
                <p className="date">{v.lotteryTime}</p>
                </div>
              </li>
            )
          })
        }
      </ul>

    )
  }
}

class More extends React.Component {
  render () {
    return (
  <div className="more-chance-mq">
        <div className="top-tip">
          <p>完成任务</p>
          <p>获得更多抽奖次数</p>
        </div>
        <ul className="task-list-mq">
          <li className="task-item" onClick={()=>{ GlobalConfig.callbackFacade('InvideFriends')() }}>
            <span className="ico ico-yq" />
            <p className="tit">邀请朋友（填写邀请码）</p>
            <p className="brief">邀请人+1次</p>
            <p className="brief">被邀请人+1次</p>
          </li>
          <li className="task-item" onClick={()=>{ GlobalConfig.callbackFacade('ShareFriendsCircle')() }}>
            <span className="ico ico-pyq" />
            <p className="tit">分享朋友圈</p>
            <p className="brief">分享一次获得+1次</p>
            <p className="brief">最多+2次</p>
          </li>
          <li className="task-item"  onClick={()=>{ GlobalConfig.callbackFacade('StartEditUserProfile')() }}>
            <span className="ico ico-zl" />
            <p className="tit">完善资料</p>
            <p className="brief">100%资料完整（包括8张头像）</p>
            <p className="brief">完成获得+1次</p>
          </li>
          <li className="task-item">
            <span className="ico ico-dl" />
            <p className="tit">连续登录</p>
            <p className="brief">三天+1次</p>
            <p className="brief">七天再+1次</p>
          </li>
        </ul>
      </div>

    )
  }
}



class Content extends React.Component {
  constructor(){
    super()
    this.state = {
      data:[],
      loading:true
    }
  }
  componentWillMount() {
    console.log(this.props.params.type);
  }
  componentDidMount() {
    if (this.props.params.type==='prize_list') {
      API.prizeList({ userId:store.get('userId')})
      .then(res=>{ return res.json() })
      .then(res=>{
        if (res.success) {
          this.setState({
            data:res.resultMap.entity || [],
            loading:false
          })
        }
       })
    }else{
      this.setState({
        loading:false
      })
    }
  }
  render () {
    if (this.state.loading) {
        return (
          <Loading />
        )
    }
    let component = null
    switch (this.props.params.type) {
      case 'more':
        component =  (
          <div className="content-mq">
            <More />
          </div>
        )
        break
      case 'explain':
        component = (
          <div className="content-mq">
            <Explain />
          </div>
        )
        break;
      default:
        component =  (
          <div className="content-mq">
            <PrizeList data={this.state.data || []} />
          </div>
        )
    }
    return component

  }
}


export default Content;
