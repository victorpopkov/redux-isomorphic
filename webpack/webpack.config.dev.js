const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common');
const paths = require('./paths');

const cssLoaders = (mode) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: '[local]___[hash:base64:5]',
        mode,
      },
      sourceMap: true,
    },
  },
  { loader: 'resolve-url-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

const scssLoaders = (mode) => [
  ...cssLoaders(mode),
  {
    loader: 'sass-loader',
    options: { sassOptions: { outputStyle: 'expanded' }, sourceMap: true },
  },
  {
    loader: 'sass-resources-loader',
    options: { resources: path.join(paths.assets, 'scss/sass-resources.scss') },
  },
];

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: {
    client: [
      'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true',
      path.join(paths.src, 'client.jsx'),
    ],
    vendor: [
      'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true',
      'bootstrap-loader',
      path.join(paths.src, 'assets/scss/vendor.scss'),
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css?$/,
        include: [/node_modules/],
        use: cssLoaders('global'),
      },
      {
        test: /\.css?$/,
        exclude: [/node_modules/],
        use: cssLoaders('local'),
      },
      {
        test: /\.scss?$/,
        include: [/node_modules/],
        use: scssLoaders('global'),
      },
      {
        test: /\.scss?$/,
        exclude: [/node_modules/],
        use: scssLoaders('local'),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new ESLintPlugin(),
    new StyleLintPlugin(),
  ],
});
