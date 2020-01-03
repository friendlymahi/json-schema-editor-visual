const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
  entry: './package/index.js',
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
  plugins: [new MiniCssExtractPlugin({ filename: "main.css" }),            new HardSourceWebpackPlugin(),
  new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
          // HardSource works with mini-css-extract-plugin but due to how
          // mini-css emits assets, assets are not emitted on repeated builds with
          // mini-css and hard-source together. Ignoring the mini-css loader
          // modules, but not the other css loader modules, excludes the modules
          // that mini-css needs rebuilt to output assets every time.
          test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
      }
  ]),]
};
