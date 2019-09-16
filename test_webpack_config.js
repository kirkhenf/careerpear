const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin

// return a function from the config file
// it will contain all the environment variables (that we set in package.json) as key/value pairs
module.exports = (env) => {
  // this object is our actual webpack config
  return {
    plugins: [
      // add the plugin to your plugins array
      new webpack.DefinePlugin({ 'process.env.TEST_MODE': JSON.stringify(env.TEST_MODE) })
    ]
  };
};