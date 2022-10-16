const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');


const devMode = process.env.NODE_ENV === 'development';


const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: './assets',
}

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}/js/[name].js`,
    path: PATHS.dist,
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath: 'assets/img/',
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          devMode?'style-loader':miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('css-mqpacker'),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ]
                  }),
                ]
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },
    ]
  },
  plugins: [
    new copyPlugin({
      patterns: [
        {from: `${PATHS.src}/static/`, to: `${PATHS.dist}/`},
        {from: `${PATHS.src}/pictures/img/`, to: `${PATHS.assets}/img/`},
        {from: `${PATHS.src}/pictures/svg/icon/`, to: `${PATHS.assets}/icon/`},
      ],
    }),
    new htmlPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    })
  ]
  .concat(devMode ? [] : [new miniCssExtractPlugin(
    {
      filename: `${PATHS.assets}/css/[name].css`,
    }
  )]),
}
