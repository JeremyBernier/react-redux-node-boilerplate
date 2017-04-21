var path = require('path')
var webpack = require('webpack')
const ROOT = '../..'
const PORT = require(ROOT + '/config/serverConfig.json').PORT

require('../symlinks')()

var configVars = {
  NODE_ENV: JSON.stringify('development'),
  BROWSER: JSON.stringify(true)
}

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, ROOT),
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, ROOT + '/build'),
    filename: 'js/main.bundle.js',
    publicPath: `http://localhost:${PORT}/`
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        postcss: [
          require('postcss-cssnext'),
          require('lost'),
          require('postcss-assets')({
            baseUrl: `http://localhost:${PORT}/`,
            relative: true,
            loadPaths: ['static/']
          })
        ]
      }
    }),
    new webpack.DefinePlugin({
      'process.env': configVars
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign({ babelrc: false }, require('./dev.babelrc.js'))
          },
          'eslint-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader'
      },
    ]
  },
}
