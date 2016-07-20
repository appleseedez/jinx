import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory,IndexRedirect } from 'react-router'

import App from '../../components/app.jsx'
import Index from '../../components/index.jsx'
import Content from '../../components/common/content.jsx'
import Pop from '../../components/common/pop.jsx'
import CheckIn from '../../components/checkin.jsx'

class NoMatch extends React.Component {
  render () {
    return (
      <div className="loading-mq">
        <div className="loading-box">
          <span className="ico-loading" />
          <p>不约...</p>
        </div>
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/index/:userId/:token/:tokenPK/:signPK" component={Index} />
      <Route path="/content/:type" component={Content} />
      <Route path="/pop/:type" component={Pop} />
      <Route path="/checkin/:residue/:willChances/:willDays/:userId/:token/:tokenPK/:signPK" component={CheckIn} />
      <Route path="*" component={NoMatch}/>
      <IndexRedirect to="/error" />
    </Route>
  </Router>
), document.getElementById('root'))
