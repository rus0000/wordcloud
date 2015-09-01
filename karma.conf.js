'use strict';
var webpack = require('webpack');

module.exports = function (config){
  config.set({
    singleRun: true,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'IE'],
    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      }
    },
    frameworks: ['mocha', 'chai', 'chai-sinon'],
    client: {
      mocha: {
        reporter: 'html' // change Karma's debug.html to the mocha web reporter
      }
    },
    files: [
      'components/**/*.test.js'
    ],
    preprocessors: {
      'components/**/*.test.js': ['webpack']
    },
    reporters: ['dots'],
    colors: true,
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.css$/,
            loader: 'null-loader'
          },
          {
            test: /\.json\.js/,
            loader: 'tojson'
          }
        ]
      },
      externals: ['sinon'], //https://github.com/webpack/karma-webpack/issues/43
      resolve: {
        modulesDirectories: ['app', 'components', 'node_modules', './bower_components'],
        extensions: ['', '.js', '.jsx']
      },
      plugins: [
        new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
      ]
    },
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-chai-sinon')
    ]
  });
};