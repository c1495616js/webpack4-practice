const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const path = require("path");

/** plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/index.js",
      output: {
        filename: "[name].bundle.[hash].js",
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
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },

              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [require("autoprefixer")()],
                },
              },
              "sass-loader",
            ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "css/styles.[contenthash].css",
        }),
        new HtmlWebpackPlugin(),
        new webpack.ProgressPlugin(),
      ],
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
