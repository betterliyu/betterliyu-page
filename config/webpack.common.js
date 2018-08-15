const path = require('path');

const webpack = require('webpack');
// webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const deployToCodingPage = process.env.DEPLOY_CODING === 'codingpages';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      // jquery: '../node_modules/jquery/dist/jquery.js',
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
      }
    }, {
      test: require.resolve("zepto"),
      use: "imports-loader?this=>window"
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
      loader: 'babel-loader',
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
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
    }, {
      test: /\.(html|htm)$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../') // CleanWebpackPlugin根路径不一致
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      template: deployToCodingPage ? './src/index-coding.html' : './src/index.html',
      hash: true,
      favicon: './favicon.ico',
      // // chunks: ['polyfill', 'app', 'vendors'],
      // chunksSortMode: 'manual',
      // inject: false,
      // mediaMapping: [
      //   { type: 'mobile', query: 'screen and (max-width: 767px)' },
      //   { type: 'pad', query: 'screen and (min-width: 767px) and (max-width: 1023px)' },
      //   { type: 'pc', query: 'screen and (min-width: 1024px)' }
      // ],
      // mode: process.env.NODE_ENV
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../CNAME'), to: '../dist' },
      { from: path.resolve(__dirname, '../README.md'), to: '../dist' },
      { from: path.resolve(__dirname, '../resume'), to: '../dist' },
      { from: path.resolve(__dirname, '../db.json'), to: '../dist' },
      { from: path.resolve(__dirname, '../robots.txt'), to: '../dist' },
      { from: path.resolve(__dirname, '../sitemap.xml'), to: '../dist' }
    ]),
    new StyleLintPlugin({
      syntax: 'scss'
    })
  ],
  optimization: {
    minimize: isProd, //是否进行代码压缩
    splitChunks: {
      chunks: "all",
      // cacheGroups: {
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   }
      // },
      // cacheGroups: {
      //   app: {
      //     name: 'app',
      //     chunks: 'all',
      //     minChunks: 2
      //   },
      //   vendors: {
      //     chunks: 'initial',
      //     name: 'vendors',
      //     test: /[\\/]node_modules[\\/]/,
      //   }
      // }
    },
    // runtimeChunk: {
    //   name: "runtime"
    // }
  }
};