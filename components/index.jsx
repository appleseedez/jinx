import React, { PropTypes } from 'react'

class Index extends React.Component {
  render () {
    return (
      <div className="index-mq">
        <div className="banner-box">
          <div className="banner" />
        </div>
        <div className="chance-box">
          <div className="chance-num">
            <span>您有</span>
            <em>1</em>
            <span>次抽奖机会</span>
          </div>
          <div className="more-chance">
            <span>获取更多机会</span>
          </div>
        </div>
        <div className="lottery-mq">
          <ul className="lottery-box" id="lottery">
            <li
              className="lottery-unit"
              lottery-unit-index={0}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={1}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={2}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={7}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li className="lottery-unit start" id="lotteryGo">
              <div className="cont-box">
                <span>充满希望来一发</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={3}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={6}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={5}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
            <li
              className="lottery-unit"
              lottery-unit-index={4}>
              <div className="cont-box">
                <div className="pic">
                  <img src="img/prize_thu/tg.png" alt />
                </div>
                <span className="name">豪华泰国游</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer">
          <span className="left">活动说明</span>
          <span className="right">我的奖品</span>
        </div>
      </div>

    )
  }
}

export default Index;
