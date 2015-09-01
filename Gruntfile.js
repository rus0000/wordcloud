'use strict';

var webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js'),
  loadGruntTasks = require('load-grunt-tasks');

module.exports = function (grunt){
  grunt.initConfig({
    'http-server': {
      dev: {
        host: '127.0.0.1',
        port: 8090,
        root: 'build',
        ext: 'html',
        showDir: true
      }
    },
    webpack: {
      options: webpackConfig,
      build: {
        entry: './app/app.js',
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            'process.env': {
              // This has effect on the react lib size
              'NODE_ENV': JSON.stringify('production')
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      }
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        host: '127.0.0.1',
        port: 8090,
        contentBase: './build',
        noInfo: false,
        hot: true,
        inline: true,
        progress: true,
        colors: true
      },
      start: {
        keepAlive: true
        //webpack: {
          //devtool: 'eval',
          //debug: true
        //}
      }
    }
  });

  loadGruntTasks(grunt);

  grunt.registerTask('dev', ['webpack-dev-server:start']);
  grunt.registerTask('build', ['webpack:build']);
  grunt.registerTask('start', ['http-server']);
  grunt.registerTask('default', ['build', 'http-server']);
};
