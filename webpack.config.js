const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    assetModuleFilename: 'images/[name][ext]',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      //favicon: path.join(__dirname, 'src', 'favicon.ico'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 8000,
  },
};
