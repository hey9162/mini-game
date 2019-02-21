var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
 var path = require("path");
 var srcDir = path.resolve(process.cwd(), 'src');
 var nodeModPath = path.resolve(__dirname, './node_modules');
 var glob = require('glob')

 var entries= function () {
 var jsDir = path.resolve(srcDir)
 var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')

 var map = {};
 for (var i = 0; i < entryFiles.length; i++) {
  var filePath = entryFiles[i];
  var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
  map[filename] = filePath;
 }
 return map;
}

module.exports = {
  entry: entries(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            'css-loader', 
            'less-loader',
          ],
        }), 
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  devServer: { 
    host:'172.16.1.67', 
    port:8088 
    },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'src/pages/into.html', // 配置输出文件名和路径
      template: 'src/pages/into.html', // 配置文件模板
    }),
    new HtmlWebpackPlugin({
      filename: 'src/pages/index.html', // 配置输出文件名和路径
      template: 'src/pages/index.html', // 配置文件模板
    }),
    new ExtractTextPlugin('[name].css')
  ],
}