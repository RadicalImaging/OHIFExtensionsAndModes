const path = require('path');
const pkg = require('../package.json');

const outputFile = 'index.umd.js';
const rootDir = path.resolve(__dirname, '../');
const outputFolder = path.join(__dirname, '../public/umd/@radical/microscopy-dicom/');


const modulesPaths = [
  path.resolve(__dirname, '..'),
  path.resolve(__dirname, '..', 'node_modules'),
  'node_modules'
];

const config = {
  mode: 'production',
  entry: rootDir + '/' + pkg.module,
  devtool: 'source-map',
  output: {
    path: outputFolder,
    filename: outputFile,
    library: pkg.name,
    libraryTarget: 'umd',
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
      'dicom-microscopy-viewer': {
        commonjs2: 'dicom-microscopy-viewer',
        commonjs: 'dicom-microscopy-viewer',
        amd: 'dicom-microscopy-viewer',
        root: 'dicom-microscopy-viewer',
      },
    },
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.tsx|\.ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            //configFile: path.resolve(__dirname, '..', 'babel.config.js'),
            presets: [
              // WebPack handles ES6 --> Target Syntax
              [
                '@babel/preset-env', { modules: false }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
          },

        },

        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      ...modulesPaths,
      path.resolve('./src')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  resolveLoader: {
    modules: [
      ...modulesPaths,
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
};

module.exports = config;
