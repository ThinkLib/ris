/**
 * store.js
 *
 * Create store with xredux
 * Reference: https://github.com/beyondxgb/xredux
 *
 */

import xredux from 'xredux';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';
import initReducers from './reducers';
import './models';

export default function configureStore(initialState = {}, history) {
  // Add router middleware and logger middleware
  const middlewares = [
    routerMiddleware(history),
    logger,
  ];
  const store = xredux.createStore(
    initReducers,
    initialState,
    middlewares,
  );
  return store;
}
