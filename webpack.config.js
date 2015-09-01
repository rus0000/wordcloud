'use strict';
var webpack = require('webpack'),
  path = require("path"),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss');

module.exports = {
  entry: {
    index: [
      'webpack/hot/dev-server',
      './app/app.js'
    ]
  },
  output: {
    path: './build',
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    host: '127.0.0.1',
    port: 8090,
    contentBase: './build',
    //noInfo: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    //new webpack.HotModuleReplacementPlugin(), //Not needed if dev-server started with grunt and hot: true
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  postcss: function (){
    return [autoprefixer({browsers: ['last 2 version']}), precss];
  },
  externals: {
    //'react': 'React',
    'jquery': 'jQuery',
    'd3': 'd3'
  },
  resolve: {
    modulesDirectories: ['app', 'components', 'node_modules', './bower_components'],
    extensions: ['', '.js', '.jsx']
  }
};