const merge = require('webpack-merge');

module.exports = (clientConfig, defaultConfig) => {
  const config = merge({}, defaultConfig, clientConfig);
  // merge rules
  // we put all user's loaders into oneOf config
  // we ensure that user's loaders is in the front of our loaders
  const { rules } = config.module;
  const newRules = [];
  const loaders = [];
  rules.forEach((item) => {
    if (item.test && (item.loader || item.use)) {
      loaders.push(item);
    } else {
      newRules.push(item);
    }
  });
  newRules.forEach((item) => {
    if (item.oneOf) {
      for (let i = loaders.length - 1; i >= 0; i -= 1) {
        item.oneOf.unshift(loaders[i]);
      }
    }
  });
  config.module.rules = newRules;
  return config;
};
