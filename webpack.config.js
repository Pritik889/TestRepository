const { webpackConfig, webpackMerge, htmlOverlay } = require('just-scripts');

module.exports = webpackMerge(
  webpackConfig,
  htmlOverlay({
    template: 'public/index.html'
  }),
 // {
   // module: {
   //   rules: [
     //   {
       //   test: /\.css$/i,
         // use: ['style-loader', 'css-loader'],
		  
       // },
     // ],
    //}  
  //}
);


