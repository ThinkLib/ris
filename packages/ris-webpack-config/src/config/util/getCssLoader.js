const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRisrc } = require('@ris/utils');

const risrc = getRisrc();

// Options for PostCSS as we reference these options twice
// Adds vendor prefixing based on your specified browser support in
// package.json
const defaultPostCssLoaderOptions = {
  // Necessary for external CSS imports to work
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};

const defaultStyleLoaderOptions = {
  insertAt: 'top',
};
const defaultCssLoaderOptions = {
  sourceMap: false,
};
// when import antd,
// it will show error "Inline JavaScript is not enabled. Is it set in your options?"
// so add this options
// https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
const defaultLessLoaderOptions = {
  javascriptEnabled: true,
};
const defaultSassLoaderOptions = {
  javascriptEnabled: true,
};

const {
  styleLoaderOptions,
  cssLoaderOptions,
  lessLoaderOptions,
  sassLoaderOptions,
  postCSSLoaderOptions,
} = risrc;

// merge user loader options
function getLoaderOptions(cssType) {
  if (cssType === 'style-loader') {
    if (styleLoaderOptions) {
      return Object.assign(defaultStyleLoaderOptions, styleLoaderOptions);
    }
    return defaultStyleLoaderOptions;
  }
  if (cssType === 'css-loader') {
    if (cssLoaderOptions) {
      return Object.assign(defaultCssLoaderOptions, cssLoaderOptions);
    }
    return defaultCssLoaderOptions;
  }
  if (cssType === 'less-loader') {
    if (lessLoaderOptions) {
      return Object.assign(defaultLessLoaderOptions, lessLoaderOptions);
    }
    return defaultLessLoaderOptions;
  }
  if (cssType === 'sass-loader') {
    if (sassLoaderOptions) {
      return Object.assign(defaultSassLoaderOptions, sassLoaderOptions);
    }
    return defaultSassLoaderOptions;
  }
  if (cssType === 'postcss-loader') {
    return postCSSLoaderOptions || defaultPostCssLoaderOptions;
  }
  return {};
}

// styleloader
const styleloader = {
  loader: require.resolve('style-loader'),
  options: getLoaderOptions('style-loader'),
};
// cssloader
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: getLoaderOptions('css-loader'),
};
// postcssLoader
const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: getLoaderOptions('postcss-loader'),
};

module.exports = (cssType, env) => {
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.
  // By default we support CSS Modules with the extension .module.css
  if (cssType === 'css-loader') {
    return [
      env === 'production' ? MiniCssExtractPlugin.loader : styleloader,
      cssLoader, postcssLoader,
    ];
  }
  return [
    env === 'production' ? MiniCssExtractPlugin.loader : styleloader,
    cssLoader, postcssLoader, {
      loader: require.resolve(cssType),
      // when import antd,
      // it will show error "Inline JavaScript is not enabled. Is it set in your options?"
      // so add this options
      // https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
      options: getLoaderOptions(cssType),
    },
  ];
};
