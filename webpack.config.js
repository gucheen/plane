var path = require('path');

var env = process.env.NODE_ENV;

var configs;

switch (env) {
  case 'development':
    configs = require('./webpack-configs/development');
    break;
  case 'production':
    configs = require('./webpack-configs/production');
    break;
  default:
    configs = require('./webpack-configs/production');
}

configs.output = {
  path: path.resolve(__dirname, 'public'),
  filename: 'bundle.js'
};

configs.resolve = {
  root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
};

module.exports = configs;
