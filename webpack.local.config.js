var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var SpritesmithPlugin = require('webpack-spritesmith');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig[1].entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  'bootstrap-loader',
  './static/js/index',
]

baseConfig[0].output['publicPath'] = 'http://localhost:3000/static/bundles/';
baseConfig[1].output = {
  path: path.resolve('./static/bundles/'),
  publicPath: 'http://localhost:3000/static/bundles/',
  filename: '[name].js',
}

baseConfig[1].module.loaders.push({
  test: /\.jsx?$/,
  exclude: [nodeModulesDir],
  loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
});
baseConfig[1].module.loaders.push({
  test: /\.json$/,
  exclude: [nodeModulesDir],
  loaders: ['json-loader']
});

baseConfig[1].plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),  // don't reload if there is an error
  new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'static/images/'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'static/images/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'static/sass/vendor/spritesmith.scss')
      },
      retina: '@2x'
  }),
  new BundleTracker({
    filename: './webpack-stats.json'
  })
]

module.exports = baseConfig;
