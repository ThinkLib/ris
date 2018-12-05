const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { getRisrc } = require('@ris/utils');

const risrc = getRisrc();
const dllPlugin = risrc.dllPlugin || {};

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.  Otherwise the CommonsChunkPlugin
 * will be used.
 *
 */
function dependencyHandlers() {
  const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/ris-react-boilerplate-dlls');

  /**
   * If DLLs aren't explicitly defined, we assume all production dependencies listed in package.json
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   */
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'risReactBoilerplateDeps.json');
    // if exist manifest file, web push DllReferencePlugin
    if (fs.existsSync(manifestPath)) {
      return [
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(manifestPath),
        }),
      ];
    }
    return [];
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));
  const dllPlugins = [];
  dllManifests.map((manifestPath) => {
    if (fs.existsSync(manifestPath)) {
      // if exist manifest file, web push DllReferencePlugin
      dllPlugins.push(new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath),
      }));
    }
    return true;
  });
  return dllPlugins;
}

module.exports = () => {
  const plugins = [];
  if (dllPlugin) {
    const files = [];
    glob.sync(`${dllPlugin.path}/*.dll.js`).forEach((dllPath) => {
      files.push({
        filepath: path.join(process.cwd(), dllPath),
        includeSourcemap: false,
      });
    });
    // if we add one AddAssetHtmlPlugin for each dllPath，there will be some error
    // so we combine all dll files to one AddAssetHtmlPlugin
    if (files.length > 0) {
      plugins.push(new AddAssetHtmlPlugin(files));
    }
  }
  return plugins.concat(dependencyHandlers());
};
