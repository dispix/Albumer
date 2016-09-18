/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict'
/**
 * ## Imports
 *
 * our 2 reducers
 */
import global from './global/globalReducer'
import device from './device/deviceReducer'

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  global,
  device
})

export default rootReducer
