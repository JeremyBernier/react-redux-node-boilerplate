import { setGlobalConfig } from './shared/GlobalConfig'
setGlobalConfig(window.__GLOBAL_CONFIG__)
const isDev = process.env.NODE_ENV === 'development'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, match, useRouterHistory } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { stringify, parse } from 'qs';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'
import { getAsyncComponentData } from './shared/renderFunctions'
import { initOptimizelyClient } from '@app/optimizely/client'
import { setWindowWidth } from './modules/screen/actions/ScreenActions.js'

import { initMobileDetect } from './client/Device'
initMobileDetect()

let routes = require('./routes').default

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
store.dispatch(setWindowWidth(window.innerWidth))

if (window.__OPTIMIZELY_DATAFILE__) {
  initOptimizelyClient(window.__OPTIMIZELY_DATAFILE__, store)
}

if (store.getState().common.serverPrefetchFailed) {
  // server prefetch failed, so fetch again
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    getAsyncComponentData(renderProps, store)
  })
}

const createAppHistory = useRouterHistory(createBrowserHistory)
const appHistory = createAppHistory({
  parseQueryString: parse,
  stringifyQuery: stringify
})

appHistory.listen(location => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    store.dispatch({
      type: '@@router/LOCATION_CHANGE'
    })

    // in the future, don't want to re-fetch data when navigating back/forward through history
    // can't implement now b/c screws up back/forward through catalog page filters
    // if (location.action !== 'POP') {
    getAsyncComponentData(renderProps, store)
      .then((data = {}) => {
        // This logic is also in serverRender.js, so any changes here must also be reflected there
        const { statusCode, redirect } = data

        if (redirect != null) {
          // replace is better than push because it preserves back button
          appHistory.replace(redirect)
        }
      })
  })
})

if (!isDev) {
  match({ history: appHistory, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(getRootElement(renderProps), document.getElementById('root'))
  })
} else {
  const AppContainer = require('react-hot-loader').AppContainer

  ReactDOM.render((
    <AppContainer>
      {getRootElement()}
    </AppContainer>
  ), document.getElementById('root'))

  if (module.hot) {
    module.hot.accept('./routes', () => {

      routes = require('./routes').default

      ReactDOM.render(
        <AppContainer key={Math.random()}>
          {getRootElement()}
        </AppContainer>,
        document.getElementById('root')
      )

    })
  }
}

///////////////////////////////////////////////

function getRootElement (renderProps = {}) {
  return (
    <Provider store={store}>
      <Router
        {...renderProps}
        history={appHistory}
        routes={routes}
        render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
      />
    </Provider>
  )
}

function shouldUpdateScroll(prevRouterProps, { routes }) {
  if (prevRouterProps != null && prevRouterProps.routes.some(route => route.ignoreScrollBehavior) && routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
}