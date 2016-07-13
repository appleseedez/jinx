import React, { PropTypes } from 'react'
class Loading extends React.Component {
  render () {
    return (
      <div className="loading-mq">
        <div className="loading-box">
          <span className="ico-loading" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }
}

export default Loading;
