var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
var WebpackMd5Hash = require('webpack-md5-hash') //required for ChunkManifestPlugin to work
var ManifestPlugin = require('webpack-manifest-plugin')
const ROOT = '../..'

// const VERSION = require(ROOT + '/package.json').version || '0.0.0'

var configVars = {
  NODE_ENV: JSON.stringify('production'),
  BROWSER: JSON.stringify(true)
}

const config = require(ROOT + '/config/config.js')['production']
// const { STATIC_URL } = config

module.exports = {
  context: path.resolve(__dirname, ROOT),
  entry: {
    main: './src/client',
    vendor: [
      'babel-polyfill',
      'lodash',
      'react',
      'react-dom',
      "react-helmet",
      'redux',
      'redux-thunk',
      'react-redux',
      'react-router',
      'react-router-scroll',
    ]
  },
  output: {
    path: path.join(__dirname, ROOT + '/build'),
    publicPath: '/',
    filename: 'js/[name]_[chunkhash]_bundle.js',
    chunkFilename: 'js/[name]_[chunkhash]_chunk.js'
  },
  resolve: {
    alias: {
      Src: path.join(__dirname, ROOT + '/src'),
      Config: path.join(__dirname, ROOT + '/config'),
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          require('postcss-cssnext'),
          require('lost'),
          require('postcss-assets')({
            basePath: 'static/',
            baseUrl: config['STATIC_URL'] + '/'
          })
        ]
      }
    }),
    new webpack.DefinePlugin({
      'process.env': configVars
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
        unused: true,
      },
      output: {
        comments: false
      },
      sourceMap: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor_[chunkhash]_bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 50000
    }),
    new WebpackMd5Hash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new ManifestPlugin(),
    new ExtractTextPlugin('css/main_[contenthash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: Object.assign({ babelrc: false }, require('./prod.babelrc.js'))
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader'
      },
    ]
  },
}
