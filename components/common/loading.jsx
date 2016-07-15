import React, { PropTypes } from 'react'
class Loading extends React.Component {
  render () {
    return (
      <div className="loading-mq">
        <div className="loading-box">
          <span className="ico-loading" />
          <p>加载中...</p>
        </div>
      </div>
    )
  }
}

export default Loading;
