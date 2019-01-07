const risDevServer = require('@ris/dev-server');
const risWebpackConfig = require('@ris/webpack-config');
const {
  getRisrc,
  getUserWebpackConfig,
  getUserServerConfig,
  mergeWebpackConfig,
  merge,
} = require('@ris/utils');
const prepareDll = require('./util/prepareDll');

const risrc = getRisrc();
const { getDllPlugins, webpackConfigDev } = risWebpackConfig;

module.exports = {
  async run() {
    // prepare dll file
    if (risrc.dll) {
      try {
        await prepareDll();
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
    }
    // user config
    const userWebpackConfig = getUserWebpackConfig();
    const userServerConfig = getUserServerConfig();
    // merge config
    const webpackConfig = mergeWebpackConfig(
      merge(userWebpackConfig.base, userWebpackConfig.dev),
      webpackConfigDev,
    );
    if (risrc.dll) {
      // add dllPlugins to improve the building speed
      const dllPlugins = getDllPlugins();
      webpackConfig.plugins = webpackConfig.plugins.concat(dllPlugins);
    }
    // start server
    risDevServer({
      webpackConfig,
      serverConfig: userServerConfig,
    });
  },
};
