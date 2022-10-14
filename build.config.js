const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');

const buildConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [

  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildConfig)
});
