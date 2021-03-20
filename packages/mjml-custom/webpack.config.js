const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    "mjml-custom": ['./src/mjml-custom'],
  },
  optimization: {
    minimizer: [
      new uglifyJsPlugin({
        uglifyOptions: {
          ecma: 5, // Supported ECMAScript Version (5, 6, 7 or 8). Affects parse, compress && output options
          keep_classnames: false,
          keep_fnames: false,
          compress: {
            passes: 2,
            keep_fargs: false
          },
          output: {
            beautify: false,
          },
          mangle: true,
          parallel: true,
        }
      })
    ]
  },
  output: {
    library: 'mjml',
    filename: '[name].js',
    path: path.resolve(__dirname, './lib'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      'fs': path.resolve(__dirname, './mocks/fs'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                "@babel/plugin-proposal-function-bind",
                "@babel/plugin-proposal-export-default-from"
              ],
              babelrc: false
            }
          }
        ]
      }
    ],
    // require
    unknownContextRegExp: /$^/,
    unknownContextCritical: false,

    // require(expr)
    exprContextRegExp: /$^/,
    exprContextCritical: false,

    // require("prefix" + expr + "surfix")
    wrappedContextRegExp: /$^/,
    wrappedContextCritical: false

  },
  plugins: [],
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
};
