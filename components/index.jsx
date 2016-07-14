import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import GlobalConfig from '../config'
import { API } from '../api'
import Loading from './common/loading.jsx'
class Index extends React.Component {
  constructor(){
    super()
    this.state = {
      remainChance:0,
      rows:[],
      loading:true
    }
  }
  componentDidMount() {
    console.log(API.getToken('ef180bbe-d8c7-3255-9883-59b3fb89e408'));
    API.index({userId:1035})
    .then(res=>{ return res.json() })
    .then(res=>{
      console.log('index:',JSON.stringify(res,null,4))
      if (res.success === true) {
        this.setState({
          remainChance:res.resultMap.entity.chanceCount,
          rows:res.resultMap.rows || [],
          loading:false
        },()=>{
          require('../build/vendors/setup.js');
        })
      }
    })
  }
  render () {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <div className="index-mq">
        <div className="banner-box">
          <div className="banner" />
        </div>
        <div className="chance-box">
          <div className="chance-num">
            <span>您有</span>
          <em>{this.state.remainChance || 0 }</em>
            <span>次抽奖机会</span>
          </div>
          <div className="more-chance">
            <span><Link to={'/content/more'} style={{color: 'white'}} >获取更多机会</Link></span>
          </div>
        </div>
        <div className="lottery-mq">
          <ul className="lottery-box" id="lottery">
          {
            _.map(this.state.rows,(v,k)=>{
              let lotteryKey = 0
              if (k === 3 || k === 5) {
                lotteryKey = 8-k

              }else if (k === 6 || k === 8) {
                lotteryKey = 14-k
              }else {
                lotteryKey = k
              }
              if (lotteryKey > 4) {
                lotteryKey = lotteryKey-1
              }
              if (k===4) {
                return (
                  <li className="lottery-unit start" id="lotteryGo" key={k}>
                    <div className="cont-box">
                      <span>充满希望来一发</span>
                    </div>
                  </li>
                )
              }
              return (
                <li
                  className="lottery-unit"
                  data-lottery-unit-index={lotteryKey} key={k}>
                  <div className="cont-box">
                    <div className="pic">
                      <img src={v.image?GlobalConfig.PIC_PREFIX+v.image :"img/prize_thu/tg.png"} alt />
                    </div>
                    <span className="name">{v.prizeName || 'JetPot'}</span>
                  </div>
                </li>
              )


            })
          }
          </ul>
        </div>
        <div className="footer">
          <span className="left"><Link to={'/content/explain'} style={{color: 'white'}} >活动说明</Link></span>
        <span className="right"><Link to={'/content/prize_list'} style={{color: 'white'}} >我的奖品</Link></span>
        </div>
      </div>

    )
  }
}

export default Index;
