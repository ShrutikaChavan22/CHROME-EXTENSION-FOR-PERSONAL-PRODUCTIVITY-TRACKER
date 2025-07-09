const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup/Popup.js',
    background: './src/background/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
