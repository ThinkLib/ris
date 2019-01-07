# Router

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

We often use [react-router](https://github.com/ReactTraining/react-router) to create our application. Because we want to keep routes in redux store. There we use [connected-react-router](https://github.com/supasate/connected-react-router) to integrate redux to react router.

## Changing history type
By default, we use `hash history`. If you want to use `browser history`, you can change it in the `src/index.js`.

```js
- import createHistory from 'history/createHashHistory';
+ import createHistory from 'history/createBrowserHistory';
```

## Adding a route

To add a route, you can configure it in `src/routes.js`.

```js
import NotFoundPage from './pages/NotFoundPage/Loadable';
import Demo from './pages/Demo/Loadable';

export default [
  {
    path: '/',
    component: Demo,
    exact: true,
  },
  {
    path: '/demo',
    component: Demo,
    exact: true,
  },
  {
    component: NotFoundPage,
  },
];
```

