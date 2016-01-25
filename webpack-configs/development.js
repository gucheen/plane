var path = require('path');

//region postcss plugins
var lost = require('lost');
var postcssImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var cssMixin = require('postcss-mixins');
var cssnano = require('cssnano');
var cssNest = require('postcss-nested');
//endregion

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DefineCssLoader = 'css-loader?localIdentName=[name]__[local]___[hash:base64:5]';

module.exports = {
  entry: ['./src/js/main', './src/index.jade'],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!' + DefineCssLoader + '!postcss-loader'
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'babel!svg-react'
    }]
  },
  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      cssNest,
      cssMixin,
      cssnext,
      lost,
      cssnano({
        zindex: false,
        reduceIdents: false,
        mergeIdents: false
      })
    ];
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      template: 'src/index.jade'
    })
  ]
};
