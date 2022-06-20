const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  target: "node",
  resolve: {
    extensions: ['.ts', '.js'],
  },
}