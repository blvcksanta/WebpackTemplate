const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const buildConfig = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|svg|webp)$/,
        loader: false,
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['mozjpeg', {quality: 50, progressive: true}],
              ['pngquant', {quality: [0.5, 0.5]}],
              ['svgo',
                {
                  multipass: true,
                  js2svg: {
                    pretty: false,
                    indent: 0,
                  },
                  plugins: [
                    'sortAttrs',
                    'removeDimensions',
                    'removeTitle',
                    'removeMetadata',
                    'convertPathData',
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                    {
                      name: 'cleanupIDs',
                      params: {
                        minify: true,
                      }
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: 'asset',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ['webp', {quality: 50}],
              ],
            },
          },
        ],
      }),
    ],
  },
  plugins: [

  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildConfig)
});
