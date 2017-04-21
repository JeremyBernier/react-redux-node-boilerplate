const DEFAULT_CONFIG = {
  "STATIC_URL": "https://xxxxxxxx.com/xxxxxx",
}

const DEV_CONFIG = {
  "API_URL": "https://dev.xxxxxx.com",
  "SEGMENT_KEY": "xxxxxxxx",
}

const PROD_CONFIG = {
  "API_URL": "https://xxxxxx.com",
  "SEGMENT_KEY": "xxxxxxxx",
}

module.exports = {
  development: Object.assign({}, DEFAULT_CONFIG, DEV_CONFIG),
  production: Object.assign({}, DEFAULT_CONFIG, PROD_CONFIG)
}