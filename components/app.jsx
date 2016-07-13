import React, { PropTypes } from 'react'
import Nav from './common/nav.jsx'

class App extends React.Component {
  componentDidMount() {
    require('../build/vendors/adaptation.js');
  }
  render () {
    let navbar = <Nav />
    if ('checkIn' === this.props.params.type) {
      navbar = null
    }
    if (this.props.location.pathname.indexOf('/index') !== -1) {
      navbar = <Nav root={true} />
    }

    console.log(this.props.location);
    return (
      <div style={{height:'100%',overflowY:'scroll'}}>
        { navbar }
        { this.props.children }
      </div>
    )
  }
}

export default App;
