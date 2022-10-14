const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8081,
    hot: false,
    liveReload: true,
    static: {
      directory: baseConfig.externals.paths.dist,
    },
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devConfig)
});
