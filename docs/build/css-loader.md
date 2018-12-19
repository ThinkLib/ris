# Adding CSS Loader Option
In many cases, we want to confirgure the css loader option. For convenience, we put this configuration to the `risrc.js`.

There are five types you can confirgure. `style-loader`、`css-loader`、`less-loader`、`sass-loader` and `postcss-loader`. You can confrigure them in `risrc.js`.

`risrc.js`

```js
module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
  styleLoaderOptions: {},
  cssLoaderOptions: {},
  lessLoaderOptions: {},
  sassLoaderOptions: {},
  postCSSLoaderOptions: {},
};
```

For example, 