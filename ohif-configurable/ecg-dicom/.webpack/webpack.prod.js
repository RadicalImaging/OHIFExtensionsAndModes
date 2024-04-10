const path = require('path');
const pkg = require('../package.json');

const rootDir = path.resolve(__dirname, '../');
const outputFolder = path.join(__dirname, `../dist/${pkg.name}/`);
const outputFile = 'index.js';

const config = {
  mode: 'production',
  entry: rootDir + '/' + pkg.module,
  devtool: 'source-map',
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
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
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
      '@cornerstonejs/core': {
        commonjs2: '@cornerstonejs/core',
        commonjs: '@cornerstonejs/core',
        amd: '@cornerstonejs/core',
        root: '@cornerstonejs/core',
      },
      '@cornerstonejs/tools': {
        commonjs2: '@cornerstonejs/tools',
        commonjs: '@cornerstonejs/tools',
        amd: '@cornerstonejs/tools',
        root: '@cornerstonejs/tools',
      },
      '@ohif/ui': {
        commonjs2: '@ohif/ui',
        commonjs: '@ohif/ui',
        amd: '@ohif/ui',
        root: '@ohif/ui',
      },
      '@ohif/mode-longitudinal': {
        commonjs2: '@ohif/mode-longitudinal',
        commonjs: '@ohif/mode-longitudinal',
        amd: '@ohif/mode-longitudinal',
        root: '@ohif/mode-longitudinal',
      },
      'config-point': {
        commonjs2: 'config-point',
        commonjs: 'config-point',
        amd: 'config-point',
        root: 'config-point',
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
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.jsx', '.tsx', '.ts'],
  },
};

module.exports = config;
