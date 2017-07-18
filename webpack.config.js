const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    title: 'My App',
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'),
    hash: true
  })
];

module.exports = env => ({
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: `build.js`
  },
  module: {
    rules: [
      {
        test: /html$/,
        loader: 'html-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules=true',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval',
  plugins
});
