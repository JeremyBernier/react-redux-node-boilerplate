import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './modules/AppContainer'
import Sell from './modules/pages/Sell'
import Home from './modules/pages/Home/HomeContainer'

//kind of lame that this polyfill is needed here
if (typeof require.ensure !== "function") {
  require.ensure = function(d, c) {
    c(require)
  }
}

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route getComponent={(location, callback) => {
        require.ensure([], function (require) {
          callback(null, require('./modules/pages/About').default);
        }, 'about');
      }}>
        <Route path="/about" />
      </Route>
      <Route path="/sell" component={Sell} />
      <Route path="/finance" getComponent={(location, callback) => {
        require.ensure([], function (require) {
          callback(null, require('./modules/pages/Finance').default);
        }, 'finance');
      }} />
    </Route>
  </Router>
)
