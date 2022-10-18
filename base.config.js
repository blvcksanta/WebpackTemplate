const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
// const copyPlugin = require('copy-webpack-plugin');


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
      {
        test: /\.(jpe?g|png)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/img/[name][ext]`
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/svg/[name][ext]`
        }
      },
      {
        test: /\.(ico|xml)$/,
        type: 'asset/resource',
        generator: {
          filename: './[name][ext]',
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
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
                config: './postcss.config.js',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
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
    ]
  },
  plugins: [
    // new copyPlugin({
    //   patterns: [
    //     {from: `${PATHS.src}/static/`, to: `${PATHS.dist}/`},
    //     {from: `${PATHS.src}/pictures/img/`, to: `${PATHS.assets}/img/`},
    //     {from: `${PATHS.src}/pictures/svg/icon/`, to: `${PATHS.assets}/svg/icon`},
    //   ],
    // }),
    new htmlPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    }),
  ]
  .concat(devMode ? [] : [new miniCssExtractPlugin(
    {
      filename: `${PATHS.assets}/css/[name].css`,
    }
  )]),
}
