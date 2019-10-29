import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../routes'
import { renderHtml } from '../modules/Html'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Helmet from 'react-helmet'
import { getAsyncComponentData } from '../shared/renderFunctions'
import { setExperimentVariationKeys } from '../modules/experiment/actions/ExperimentActions'
import { serverPrefetchFailed } from '../modules/common/actions/CommonActions'
import { setUuid } from '../modules/auth/actions/AuthActions'
import { generateUuid, uuidCookieName } from './misc/uuid'
import { getVariationKeys, hasActiveExperiments, getDatafile } from '../optimizely/server'
import { promiseTimeout } from '../utils/async'

const UUID_COOKIE_TIME = 62208000000 //2 years

// if server prefetching calls taking longer than this, cancel and just send site
const SERVER_TIMEOUT_THRESHOLD = 1000

let manifest, chunkManifest

if (process.env.NODE_ENV !== 'development') {
  manifest = require('../../build/manifest.json')
  chunkManifest = require('../../build/chunk-manifest.json')
}

module.exports = function () {
  return function (req, res) {
    const store = configureStore({})
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const cookies = req.cookies || {}
        let uuid
          , activeExperiment = false

        // another person's uuid could be impersonated
        if (cookies[uuidCookieName] != null) {
          uuid = cookies[uuidCookieName]
        } else {
          uuid = generateUuid()
          res.cookie(uuidCookieName, uuid, { maxAge: UUID_COOKIE_TIME })
        }

        store.dispatch(setUuid(uuid))

        if (hasActiveExperiments()) {
          activeExperiment = true
          const variationKeys = getVariationKeys(uuid)
          store.dispatch(setExperimentVariationKeys(variationKeys))
        }

        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.

        let promises = [
          getAsyncComponentData(renderProps, store)
        ]

        promiseTimeout(Promise.all(promises), SERVER_TIMEOUT_THRESHOLD)
          .catch((err) => {
            console.error('Server prefetching failed', err)
            store.dispatch(serverPrefetchFailed())
          })
          .then((promiseArr = []) => {
            // This logic is also in client.js, so any changes here must also be reflected there
            const promiseData = promiseArr[0] || {}
            const { statusCode, redirect } = promiseData

            if (redirect != null) {
              return res.redirect(redirect)
            }

            let bodyHtml = renderToStaticMarkup(
              <Provider store={store}>
                  <RouterContext {...renderProps} />
              </Provider>
              )
            let head = Helmet.rewind()
            res.status(statusCode || 200).send('<!DOCTYPE html>' + renderHtml({
              head,
              initialState: store.getState(),
              bodyHtml,
              manifest,
              chunkManifest,
              optimizelyDatafile: activeExperiment && getDatafile()
            }))
          })
      } else {
        res.status(404).send('Not found')
      }
    })
  }
}
