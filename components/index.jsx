import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import GlobalConfig from '../config'
import { API } from '../api'
import Loading from './common/loading.jsx'
import Pop from './common/pop.jsx'
let prizeItemKeyMap = null
let lotteryKeyMap = null
let lotteryInstance = null
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      remainChance: 0,
      rows: [],
      loading: true,
      pop:false,
      prize:{},
      data:{}
    }
   
  }
  componentDidMount() {
    if(!store.enabled){
      this.context.router.push('/error')
    }
    store.set('userId',decodeURIComponent(this.props.params.userId))
    store.set('token',decodeURIComponent(this.props.params.token) )
    API.setTokenKey(decodeURIComponent(this.props.params.tokenPK))
    API.setSignKey(decodeURIComponent(this.props.params.signPK))
    if(!store.get('userId')){
      this.context.router.push('/error')
    }
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
    API.index({ userId: store.get('userId') })
      .then(res => { return res.json() })
      .then(res => {
        if (res.success === true) {
          this.setState({
            remainChance:res.resultMap.entity.chanceCount,
            rows: res.resultMap.rows || [],
            loading: false
          }, () => {
            this._setup()
          })
        }else{
           GlobalConfig.callbackFacade('Logout')()
        }
      })
  }
  componentWillUnmount() {
    this.setState({ loading: true })
    prizeItemKeyMap = null
    lotteryKeyMap = null
    lotteryInstance._stop()
    $('.lottery-unit').removeClass('pre')
  }
  _setup() {
    let component = this
    $('#lotteryGo').on('click', function () {
      if(lotteryInstance.options.isRunning) return 
      var $that = $(this);
      var t = setTimeout(function () {
        $that.removeClass('pre');
      }, 200);
      $that.addClass('pre');
    })

    lotteryInstance = lottery.lottery({
      selector:'#lottery',
      width:3,
      height:3,
      index:0,
      initSpeed:500,
      upStep:100,
      upMax:100,
      downStep:60,
      downMax:360,
      waiting:2000,
      beforeRoll:()=>{
        API
        .loot({userId:store.get('userId')})
        .then(res=>res.json())
        .then(res=>{
          if (res.success) {
            lotteryInstance.options.target = prizeItemKeyMap[res.resultMap.entity.prizeId] 
            component.setState({
              remainChance:res.resultMap.entity.remainTimes,
              popType:(res.resultMap.entity.virtual?'virtual':'material'),
              pop:false,
              data:res.resultMap.entity,
            })
          }else{
            lotteryInstance._stop()
            $('.lottery-unit').removeClass('pre')
            component.setState({
              popType:'Error',
              pop:true,
              data:{}
            })
          }

        })
        .catch(err=>{
          lotteryInstance._stop()
          $('.lottery-unit').removeClass('pre')
          component.context.router.push('/error')
        })
      },
      afterStop:()=>{
        if(!prizeItemKeyMap) return 
        if (prizeItemKeyMap[this.state.data.prizeId] !== undefined ) {
          this.setState({
            pop:true
          })
        }else{
          this.setState({
            pop:false
          })
        }
      },
      aim:()=>{

      }
    })

    if (parseInt(this.state.remainChance) <= 0) {
      $('#lotteryGo').unbind('click')
      $('#lotteryGo').off('click').on('click',()=>{
        this.context.router.push('/content/more')
      })
      return 
    }

    // let component = this
    // if(parseInt(component.state.remainChance) === 0){
    //   $('#lotteryGo').unbind('click')
    //   $('#lotteryGo').off('click').on('click',()=>{
    //       component.context.router.push('/content/more')
    //       return false
    //   })
    //  return
    // }
    // lottery.lottery({
    //   selector: '#lottery',
    //   width: 3,
    //   height: 3,
    //   index: 7,    // 初始位置
    //   initSpeed: 500,  // 初始转动速度
    //   upStep: 100,   // 加速滚动步长
    //   upMax: 100,   // 速度上限
    //   downStep: 60,   // 减速滚动步长
    //   downMax: 360,  // 减速上限
    //   waiting: 2000, // 匀速转动时长
    //   afterStop: function () {
    //     if(this.options.target !== 8){
    //       component.setState({
    //         pop:true
    //       })
    //     }else{
    //       component.setState({
    //         pop:false
    //       })
    //     }

    //   },
    //   beforeRoll: function () { 
    //     let self = this
    //     self.options.target = 8  
    //     self.options.aim = ()=>{

    //     }

    //     // 做数据请求, 并且限定超时时间为 <= waiting
    //     let Promise = require('bluebird') 
    //     new Promise((resolve,reject)=>{
    //       // 超时函数,如果超时,就发一个reject
    //       let timeout = setTimeout(function() {
    //         reject(new Exception('request timeout'))
    //       }, self.options.waiting-200)
    //         API.loot({userId:store.get('userId')})
    //         .then(res=>{
    //           clearTimeout(timeout)
    //           return res.json()
    //         })
    //         .then(res=>{
    //           resolve()
    //           if(res.success === true){
    //             self.options.target = prizeItemKeyMap[res.resultMap.entity.prizeId] 
    //             component.setState({
    //               remainChance:res.resultMap.entity.remainTimes,
    //               popType:(res.resultMap.entity.virtual?'virtual':'material'),
    //               pop:false,
    //               data:res.resultMap.entity,
    //             },()=>{
    //                   if(parseInt(component.state.remainChance) === 0){
    //                     $('#lotteryGo').unbind('click')
    //                     $('#lotteryGo').off('click').on('click',()=>{
    //                         component.context.router.push('/content/more')
    //                         return false
    //                     })

    //                   }
    //             })
    //           }else{
    //            self._stop()
    //           }
    //         })
    //         .catch(err=>{
    //           reject(err)
    //           self.options.target = 8
    //           self.options.aim = null
    //           self._stop()
    //         })
    //     })
    //     .then(()=>{

    //     })
    //     .catch((err)=>{
    //       console.log('error')
    //       self.options.target = 8
    //       self.options.aim = null
    //       self._stop()
    //       component.context.router.push('/error')
    //     })
    //   }
    // })


    // $('#lotteryGo').on('click', function () {
    //   var $that = $(this);
    //   var t = setTimeout(function () {
    //     $that.removeClass('pre');
    //   }, 200);
    //   $that.addClass('pre');
    // })
  }
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <div style={{height:"100%"}}>
      {this.state.pop && <Pop data={this.state.data} popType={this.state.popType} closeFun={()=>{this.setState ({pop:false})} }/>}
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
                    <li className="lottery-unit start" id="lotteryGo" key={k} data-lottery-unit-index={8}>
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
                        <img src={v.image ? GlobalConfig.PIC_PREFIX + v.image + '-adsmall' : "img/prize_thu/tg.png-adsmall"} alt />
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
Index.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default Index;
