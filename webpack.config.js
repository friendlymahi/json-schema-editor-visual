const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './package/index.js',
  "mode":"production",
  output: {
    publicPath: "/dist/",
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader']
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "main.css" })]
};
