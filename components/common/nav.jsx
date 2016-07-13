import React, { PropTypes } from 'react'

class Nav extends React.Component {

  render () {
    console.log(this.props.root);
    return (
      <nav className="nav-mq">
        { !this.props.root && <span className="back" id="J_BackBtn" onClick={()=>{this.context.router.goBack()}} /> }
        <h1>妙喵抽奖</h1>
      </nav>
    )
  }
}
Nav.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default Nav;
