const webpack = require("webpack");

module.exports = (env) => ({
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3030,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
