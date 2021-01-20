const path = require("path");
const webpack = require("webpack");
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: ["vue-style-loader", "css-loader", "sass-loader"]
         },
         {
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
               dynamicTyping: true,
               header: true,
               skipEmptyLines: true
            }
         },
         {
            test: /\.(csv|xlsx|xls)$/,
            loader: 'file-loader',
            options: {
               name: `files/[name].[ext]`
            }
         },
         {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
         },
      ],
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]-[hash].js',
      chunkFilename: '[id]-[chunkhash].js',
   },
   plugins: [
      new WebpackAssetsManifest({
         publicPath: process.env.VUE_APP_FRONTEND_ROOT_URL,
      }),
      new webpack.DefinePlugin({
         "API_URL": process.env.VUE_APP_FRONTEND_ROOT_URL
      }),
      new webpack.optimize.CommonsChunkPlugin({
         name: "vendor",
         filename: "vendor.js",
         minChunks: ({ resource }) => /node_modules/.test(resource)
      }),
   ],
};
