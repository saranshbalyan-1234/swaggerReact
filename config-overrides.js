const rewireUglifyjs = require("react-app-rewire-uglifyjs");
module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config = rewireUglifyjs(config);
  return config;
};
