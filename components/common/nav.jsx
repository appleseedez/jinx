import React, { PropTypes } from 'react'

class Nav extends React.Component {

  render () {
    console.log(this.props.root);
    let clickFun = (!this.props.root)? ()=>{this.context.router.goBack()} :() => { window && window.activity && window.activity.finishActivity() }
    return (
      <nav className="nav-mq">
        <span className="back" id="J_BackBtn" onClick={clickFun} />
        <h1>妙喵抽奖</h1>
      </nav>
    )
  }
}
Nav.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default Nav;
