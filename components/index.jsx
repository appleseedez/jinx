import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import GlobalConfig from '../config'
import { API } from '../api'
import Loading from './common/loading.jsx'
import Pop from './common/pop.jsx'
let prizeItemKeyMap = null
let lotteryKeyMap = null
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      remainChance: 0,
      rows: [],
      loading: true,
      pop:false,
      prize:{}
    }
  }
  componentDidMount() {
    prizeItemKeyMap = {}
    lotteryKeyMap = { // 键盘九宫格位置到实际编号的映射
      0:0,
      1:1,
      2:2,
      3:7,
      5:3,
      6:6,
      7:5,
      8:4
    }
    API.index({ userId: 1035 })
      .then(res => { return res.json() })
      .then(res => {
        console.log('index:', JSON.stringify(res, null, 4))
        if (res.success === true) {
          this.setState({
            remainChance: res.resultMap.entity.chanceCount,
            rows: res.resultMap.rows || [],
            loading: false
          }, () => {
            this._setup()

          })
        }
      })
  }
  componentWillUnmount() {
    this.setState({ loading: true })
    prizeItemKeyMap = null
    lotteryKeyMap = null
    console.log('unmount')
  }
  _setup() {
    let component = this
    lottery.lottery({
      selector: '#lottery',
      width: 3,
      height: 3,
      index: 7,    // 初始位置
      initSpeed: 500,  // 初始转动速度
      upStep: 100,   // 加速滚动步长
      upMax: 100,   // 速度上限
      downStep: 30,   // 减速滚动步长
      downMax: 500,  // 减速上限
      waiting: 1500, // 匀速转动时长
      afterStop: function () {
        component.setState({
          pop:true
        })
      },
      beforeRoll: function () { 
        let self = this
        self.options.aim = ()=>{

        }
        // 做数据请求, 并且限定超时时间为 <= waiting
        let Promise = require('bluebird') 
        new Promise((resolve,reject)=>{
          // 超时函数,如果超时,就发一个reject
          let timeout = setTimeout(function() {
            reject(new Exception('request timeout'))
          }, self.options.waiting-200)
            API.loot({userId:1035})
            .then(res=>{
              clearTimeout(timeout)
              return res.json()
            })
            .then(res=>{
              resolve()
              if(res.success){
                self.options.target = prizeItemKeyMap[res.resultMap.entity.prizeId] 
                component.setState({
                  remainChance:res.resultMap.entity.remainTimes,
                  popType:(res.resultMap.entity.virtual?'virtual':'material'),
                  pop:false,
                  data:res.resultMap.entity
                })
              }
            })
        })
        .then(()=>{

        })
        .catch((err)=>{
          self.options.target = 7
          self.options.aim = null
        })
      }
    })


    $('#lotteryGo').on('click', function () {
      var $that = $(this);
      var t = setTimeout(function () {
        $that.removeClass('pre');
      }, 200);
      $that.addClass('pre');
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <div style={{height:"100%"}}>
      {this.state.pop && <Pop data={this.state.data} popType={this.popType} closeFun={()=>{this.setState ({pop:false})} }/>}
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
            <span><Link to={'/content/more'} style={{ color: 'white' }} >获取更多机会</Link></span>
          </div>
        </div>
        <div className="lottery-mq">
          <ul className="lottery-box" id="lottery">
            {
              _.map(this.state.rows, (v, k) => {
                if (k === 4) {
                  return (
                    <li className="lottery-unit start" id="lotteryGo" key={k}>
                      <div className="cont-box">
                        <span>充满希望来一发</span>
                      </div>
                    </li>
                  )
                }
                prizeItemKeyMap[v.prizeId] = lotteryKeyMap[k]
                return (
                  <li
                    className="lottery-unit"
                    data-lottery-unit-index={lotteryKeyMap[k]} key={k}>
                    <div className="cont-box">
                      <div className="pic">
                        <img src={v.image ? GlobalConfig.PIC_PREFIX + v.image : "img/prize_thu/tg.png"} alt />
                      </div>
                      <span className="name">{ v.prizeName || 'JetPot' }</span>
                    </div>
                  </li>
                )


              })
            }
          </ul>
        </div>
        <div className="footer">
          <span className="left"><Link to={'/content/explain'} style={{ color: 'white' }} >活动说明</Link></span>
          <span className="right"><Link to={'/content/prize_list'} style={{ color: 'white' }} >我的奖品</Link></span>
        </div>
      </div>
      </div>
      

    )
  }
}

export default Index;
