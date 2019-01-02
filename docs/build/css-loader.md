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
### Add namespace

For example, we want to add `postcss-selector-namespace` plugin in postcss-loader, you can do like this:

```js
const PostcssSelectorNamespace = require('postcss-selector-namespace');

module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
  postCSSLoaderOptions: {
    plugins: [
      PostcssSelectorNamespace({ namespace: '.ris-app' })
    ],
  },
};
```

Of course, you should install `postcss-selector-namespace` to the dependencies.

### Add antd theme

If you use `ant-design`, sometimes you want to customize the theme of the components. You can configure the `lessLoaderOptions`.

```js
const theme = {
  'primary-color': 'red',
};

module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
  lessLoaderOptions: {
    modifyVars: theme,
    javascriptEnabled: true,
  },
};
```

And remember that you should check whether if it is load less style.

`.babelrc`

```json
{
  "presets": ["@ris/babel-preset-react"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      },
      "antd"
    ]
  ]
}
```
