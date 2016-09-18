/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'
/**
 * ## Imports
 *
 * redux functions
 */
import { createStore } from 'redux'

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers'

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore (initialState) {
  return createStore(reducer, initialState)
};
