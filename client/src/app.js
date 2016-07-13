import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import App from '../../components/app.jsx'
import Index from '../../components/index.jsx'
import Content from '../../components/common/content.jsx'
import Pop from '../../components/common/pop.jsx'

class NoMatch extends React.Component {
  render () {
    return (
      <div className="loading-mq">
        <p>打你哦...</p>
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/index" component={Index} />
      <Route path="/content/:type" component={Content} />
      <Route path="/pop/:type" component={Pop} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
