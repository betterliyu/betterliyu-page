const path = require('path');

// webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);

module.exports = {
  entry: {
    polyfill: path.resolve(__dirname, '../src/polyfill.js'),
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, {
      test: /\.css$/,
      use: [{
        loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader'
      }]
    }, {
      test: /\.scss|\.sass$/,
      use: [{
        loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'resolve-url-loader'
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: '[name].[hash].[ext]',
        outputPath: 'images/'
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash].[ext]',
        outputPath: 'fonts/'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../') // CleanWebpackPlugin根路径不一致
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      template: './src/index.html',
      hash: true,
      chunks: ['polyfill', 'app'],
      chunksSortMode: 'manual'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../CNAME'), to: '../dist' },
      { from: path.resolve(__dirname, '../README.md'), to: '../dist' },
      { from: path.resolve(__dirname, '../favicon.ico'), to: '../dist' }
    ]),
    new StyleLintPlugin({
      syntax: 'scss'
    })
  ]
};