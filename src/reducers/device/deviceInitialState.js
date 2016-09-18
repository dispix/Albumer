/**
 * # deviceInitialState.js
 *
 */
'use strict'
/**
 * ## Import immutable record
 */
import { Record } from 'immutable'

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  isMobile: false,
  platform: '',
  version: null
})

export default InitialState
