/**
 * # globalInitialState.js
 *
 */
'use strict'
/**
 * ## Import
 */
import { Record } from 'immutable'
/**
 * ## InitialState
 *
 * * showState - toggle for Header to display state
 * * currentState - object in Json format of the entire state
 * * store - the Redux store which is an object w/ 1 initial state
 *   * global
 *
 */
var InitialState = Record({
  showState: false,
  currentState: null,
  store: null
})

export default InitialState
