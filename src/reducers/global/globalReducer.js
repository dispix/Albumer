/**
 * # globalReducer.js
 *
 *
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const {
  GET_STATE,
  SET_STATE,
  SET_STORE
} = require('../../lib/constants').default

import InitialState from './globalInitialState'

const initialState = new InitialState()
/**
 * ## globalReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function globalReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    /**
     * ### sets the payload into the store
     *
     * *Note* this is for support of Hot Loading - the payload is the
     * ```store``` itself.
     *
     */
    case SET_STORE:
      return state.set('store', action.payload)

    /**
     * ### Get the current state from the store
     *
     * The Redux ```store``` provides the state object.
     * We convert each key to JSON and set it in the state
     *
     * *Note*: the global state removes the ```store```, otherwise,
     * when trying to convert to JSON, it will be recursive and fail
     */
    case GET_STATE:
      const _state = state.store.getState()

      if (action.payload) {
        const newState = {}
        newState['device'] = _state.device.toJS()

      // Make sure global doesn't have the previous currentState
        // let _noCurrentState =  _state.global.set('currentState',null);
        // let _noStore = _noCurrentState.set('store',null);

        newState['global'] = _state.global.set('currentState', null).set('store', null).toJS()

        return state.set('showState', action.payload)
        .set('currentState', newState)
      } else {
        return state.set('showState', action.payload)
      }

    /**
     * ### Set the state
     *
     * This is in support of Hot Loading
     *
     */
    case SET_STATE:
      const global = JSON.parse(action.payload).global
      const next = state.set('currentUser', global.currentUser)
          .set('showState', false)
          .set('currentState', null)
      return next

    /**
     * ### Default behavior
     *
     * In case the action.type is not listed or undefined, just return the state
     *
     */
    default:
      return state
  }
}
