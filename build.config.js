const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const copyPlugin = require('copy-webpack-plugin');


const buildConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img/',
        }
      },
    ]
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 70,
              },
            },
          },
        },
        generator: [
          {
            type: "asset",
            implementation: ImageMinimizerPlugin.squooshGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 60,
                },
              },
            },
          },
        ],
      }),
    ],
  },
  plugins: [
    new copyPlugin({
      patterns: [
        {from: `${baseConfig.externals.paths.src}/pictures/img/`, to: `${baseConfig.externals.paths.assets}/img/`},
      ],
    }),
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildConfig)
});
