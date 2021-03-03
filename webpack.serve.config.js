const { webpackMerge, htmlOverlay, webpackServeConfig } = require('just-scripts');

module.exports = webpackMerge(
  webpackServeConfig,
  htmlOverlay({
    template: 'public/index.html'
  }),
  {
    // Here you can custom webpack configurations
    devServer: {
      historyApiFallback: true,
    },
  
    output: {
      publicPath: '/'

    }
  }
);
