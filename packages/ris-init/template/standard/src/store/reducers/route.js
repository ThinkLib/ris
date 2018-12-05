/**
 * route.js
 *
 * Create route reducer to listen location change
 * Reference: https://github.com/reactjs/react-router-redux
 *
 */

import { LOCATION_CHANGE } from 'react-router-redux';

// Initial routing state
const routeInitialState = {
  location: null,
};

// Merge route into the global application state
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}

export default routeReducer;
