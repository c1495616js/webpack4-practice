const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const path = require("path");

const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/index.js",
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
      },
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                },
              },
            ],
          },
          {
            test: /\.s?css$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
      output: {
        filename: "bundle.js",
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
