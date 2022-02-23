/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env) => {
  const nodeENV = env.NODE_ENV || 'local';
  const envFilename = `${nodeENV}.env`;
  const envFilenamePath = path.join(__dirname, `.env/${envFilename}`);
  const dotenv = require('dotenv').config({
    path: envFilenamePath,
  });

  const isLocal = nodeENV === 'local';
  const distFolder = 'dist';
  const filename = `chatchilla-live-chat-${nodeENV}-${isLocal ? `[name]` : 'app'}.js`;
  const templatePath = isLocal ? './index.local.html' : './index.production.html';

  const webpackPlugins = [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: templatePath,
      filename: './index.html',
      inject: false,
      minify: false,
    }),
    new HtmlWebPackPlugin({
      template: './preview.html',
      filename: './preview.html',
      inject: false,
      minify: false,
    }),
    new webpack.DefinePlugin({
      'process.env': Object.keys(dotenv.parsed).reduce((envs, key) => {
        envs[key] = JSON.stringify(dotenv.parsed[key]);
        return envs;
      }, {}),
    }),
    new ForkTsCheckerWebpackPlugin(),
    isLocal
      ? undefined
      : new ReplaceInFileWebpackPlugin([
          {
            dir: path.resolve('./', distFolder),
            files: [`index.html`, 'preview.html'],
            rules: [
              {
                search: 'chatchilla-live-chat-local-app.js',
                replace: filename,
              },
            ],
          },
        ]),
  ].filter(Boolean);

  const config = {
    entry: {
      app: ['./src/Index.tsx'],
    },
    output: {
      path: path.resolve('./', distFolder),
      filename,
      publicPath: '/',
    },
    devServer: {
      contentBase: distFolder,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg?$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.js', '.ts', '.tsx'],
    },
    plugins: webpackPlugins,
    optimization: {
      minimize: false,
      emitOnErrors: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
          },
          react: {
            test: /react/,
            name: 'react',
          },
          antd: {
            test: /antd/,
            name: 'antd',
          },
        },
      },
    },
  };

  if (!isLocal) {
    config.optimization = {
      minimizer: [new TerserPlugin({})],
    };
  }

  return config;
};
