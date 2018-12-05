const path = require('path');
const constant = require('./constant');
const getCssLoader = require('./util/getCssLoader');

module.exports = env => ({
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // Process application JS with Babel.
      // The preset includes JSX, and some ESnext features.
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: constant.appSrc,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve('thread-loader'),
              {
                loader: require.resolve('babel-loader'),
                options: {
                  // babelrc: false,
                  // presets: [require.resolve('@ris/babel-preset-react')],
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  // Do not include superfluous whitespace characters and line terminators.
                  compact: true,
                  highlightCode: true,
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: getCssLoader('less-loader', env),
          }, {
            test: /\.scss$/,
            use: getCssLoader('sass-loader', env),
          }, {
            test: /\.css$/,
            use: getCssLoader('css-loader', env),
          },
          {
            test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
            use: require.resolve('file-loader'),
          },
          {
            test: /\.(bmp|gif|png|jpe?g)$/i,
            loader: require.resolve('url-loader'),
            options: {
              limit: 1,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolveLoader: {
    modules: [
      path.join(__dirname, '../../', 'node_modules'),
      'node_modules',
    ],
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    modules: [
      constant.appSrc,
      path.join(__dirname, '../../', 'node_modules'),
      'node_modules',
    ],
    alias: {
      '@babel/runtime': path.dirname(
        require.resolve('@babel/runtime/package.json'),
      ),
    },
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
  },
  target: 'web',
});
