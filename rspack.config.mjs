import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import rspack from "@rspack/core"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: "javascript/auto",
        use: [
          { loader: rspack.CssExtractRspackPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(png|woff2?|svg|eot|ttf|otf|gif|jpe?g|mp3|wav)$/i,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 512 /* bytes */ } },
      },
    ]
  },
  plugins: [
    new rspack.CssExtractRspackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
};

export default config;
