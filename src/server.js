'use strict';

const isDev = process.env.NODE_ENV === 'development'

const serverConfig = require('../config/serverConfig.json')
const HOST = isDev ? 'localhost' : "0.0.0.0"
const PORT = serverConfig.PORT

const fetch = require('isomorphic-fetch')

//// Initialize Global variables

const configFile = require('../config/config.js')
const config = configFile[process.env.NODE_ENV] || configFile['development']

import { setGlobalConfig } from './shared/GlobalConfig'
setGlobalConfig(config)

for (var key in config) {
  process.env[key] = config[key]
}

process.env.VERSION = require('../package.json').version

///////////////////////////////

const express = require('express')
    , app = new express()

if (isDev) {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack/development/dev.config.js')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  app.use('/', express.static('static'))
} else {
  // These files should be hosted on CDN. Hosted here only as backup
  // don't add max-age until issue fixed
  app.use('/', express.static('build'))
}

require('./server/routes/index.js')(app)

// TODO: Session thing for auth not working in production mode, commenting out in meantime
// require('./server/auth')(app, express, serverConfig.authSecretKey)

// const optimizely = require('./optimizely/server')
// optimizely.initOptimizelyClient()
// app.post('/optimizely/webhook-handler', optimizely.handleOptimizelyWebhook)

app.get("*", require('./server/serverRender')())

app.disable('x-powered-by')

app.listen(PORT, HOST, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://%s:%s/ in your browser.", PORT, HOST, PORT)
  }
});

// require('../config/sslConfig.js')(app);
