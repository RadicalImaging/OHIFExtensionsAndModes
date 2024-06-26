const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootDir = path.resolve(__dirname, '../');
const outputFolder = path.join(__dirname, `../dist/${pkg.name}/`);
const outputFile = 'index.js';

const config = {
  mode: 'production',
  entry: rootDir + '/' + pkg.module,
  devtool: 'source-map',
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
  output: {
    path: outputFolder,
    filename: outputFile,
    library: pkg.name,
    publicPath: `/${pkg.name}/`,
    libraryTarget: 'umd',
    chunkFilename: '[name].chunk.js',
    umdNamedDefine: true,
  },
  externals: [
    {
      "cornerstone-wado-image-loader": {
        root: 'cornerstone-wado-image-loader',
        commonjs2: 'cornerstone-wado-image-loader',
        commonjs: 'cornerstone-wado-image-loader',
        amd: 'cornerstone-wado-image-loader',
      },
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'gl-matrix': {
        root: 'gl-matrix',
        commonjs2: 'gl-matrix',
        commonjs: 'gl-matrix',
        amd: 'gl-matrix',
      },
      'lodash.clonedeep': {
        root: 'lodash.clonedeep',
        commonjs2: 'lodash.clonedeep',
        commonjs: 'lodash.clonedeep',
        amd: 'lodash.clonedeep',
      },
      'lodash.get': {
        root: 'lodash.get',
        commonjs2: 'lodash.get',
        commonjs: 'lodash.get',
        amd: 'lodash.get',
      },
      '@cornerstonejs/tools': {
        root: '@cornerstonejs/tools',
        commonjs2: '@cornerstonejs/tools',
        commonjs: '@cornerstonejs/tools',
        amd: '@cornerstonejs/tools',
      },
      '@cornerstonejs/core': {
        root: '@cornerstonejs/core',
        commonjs2: '@cornerstonejs/core',
        commonjs: '@cornerstonejs/core',
        amd: '@cornerstonejs/core',
      },
      // Do not include config-point in the externals as this is the module htat provides it.
      // 'config-point': {
      //   root: 'config-point',
      //   commonjs2: 'config-point',
      //   commonjs: 'config-point',
      //   amd: 'config-point',
      // },
      'classnames': {
        root: 'classnames',
        commonjs2: 'classnames',
        commonjs: 'classnames',
        amd: 'classnames',
      },
      'react-router-dom': {
        root: 'react-router-dom',
        commonjs2: 'react-router-dom',
        commonjs: 'react-router-dom',
        amd: 'react-router-dom',
      },
      'dicomweb-client': {
        root: 'dicomweb-client',
        commonjs2: 'dicomweb-client',
        commonjs: 'dicomweb-client',
        amd: 'dicomweb-client',
      },
      dcmjs: {
        root: 'dcmjs',
        commonjs2: 'dcmjs',
        commonjs: 'dcmjs',
        amd: 'dcmjs',
      },
      '@ohif/core': {
        commonjs2: '@ohif/core',
        commonjs: '@ohif/core',
        amd: '@ohif/core',
        root: '@ohif/core',
      },
      '@ohif/ui': {
        commonjs2: '@ohif/ui',
        commonjs: '@ohif/ui',
        amd: '@ohif/ui',
        root: '@ohif/ui',
      },
    },
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.tsx|\.ts)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('../node_modules'), path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.jsx', '.tsx', '.ts'],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new MiniCssExtractPlugin({
      filename: './dist/[name].css',
      chunkFilename: './dist/[id].css',
    }),
  ],
};

module.exports = config;
