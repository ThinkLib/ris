const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const { merge, getRisrc } = require('@ris/utils');
const createCompiler = require('./util/createCompiler');
const choosePort = require('./util/choosePort');
const prepareUrls = require('./util/prepareUrls');
const serverDefaultConfig = require('./config');

const risrc = getRisrc();
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = 3000;

// hide webpack deprecation warning
process.noDeprecation = true;

function bugfree() { /*
                                 _oo8oo_
                                o8888888o
                                88" . "88
                                (| -_- |)
                                0\  =  /0
                              ___/'==='\___
                            .' \\|     |// '.
                           / \\|||  :  |||// \
                          / _||||| -:- |||||_ \
                         |   | \\\  -  /// |   |
                         | \_|  ''\---/''  |_/ |
                         \  .-\__  '-'  __/-.  /
                       ___'. .'  /--.--\  '. .'___
                    ."" '<  '.___\_<|>_/___.'  >' "".
                   | | :  `- \`.:`\ _ /`:.`/ -`  : | |
                   \  \ `-.   \_ __\ /__ _/   .-` /  /
               =====`-.____`.___ \_____/ ___.`____.-`=====
                                 `=---=`
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         佛祖保佑         永无BUG
*/ }

function onCompileDone(urls) {
  setTimeout(() => {
    console.log();
    console.log([
      '  App running at:',
      `  - ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`,
      `  - ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`,
    ].join('\n'));
    console.log();
    if (risrc.bugfree) {
      console.log(bugfree.toString().split('\n').slice(1, -1).join('\n'));
    }
  }, 0);
}

function onCompileInvalid() {
  // onCompileInvalid
}

module.exports = async (options) => {
  const {
    webpackConfig,
    serverConfig,
  } = options;

  // merge config(default、user、client)
  const devServerConfig = merge(serverDefaultConfig, serverConfig, {
    publicPath: webpackConfig.output.publicPath || serverConfig.publicPath,
  });

  // choose an available port
  const port = await choosePort(HOST, devServerConfig.port || DEFAULT_PORT);
  if (port == null) {
    // we have not found a port.
    return;
  }

  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, port);

  const compiler = createCompiler({
    webpackConfig,
    onCompileDone: onCompileDone.bind(this, urls),
    onCompileInvalid,
  });

  // create a dev server
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(port, HOST, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
