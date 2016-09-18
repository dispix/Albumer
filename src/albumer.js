'use strict'
/**
 *  # albumer
 *
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react'
import {
    AppRegistry,
    StyleSheet } from 'react-native'

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
    Router,
    Scene } from 'react-native-router-flux'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    Provider } from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```
 *
 */
import configureStore from './lib/configureStore'

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import Main from './containers/Main'
// import Subview from './containers/Subview'

/**
 * ### components
 *
 * Import the Tab Icon component
 *
 */
import Default from './components/Default'

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'

/**
 *  The version of the app but not  displayed yet
 */
import pack from '../package'
const VERSION = pack.version

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState () {
  const _initState = {
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState())
  }
  return _initState
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70
  }
})

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native (platform) {
  const Albumer = React.createClass({
    render () {
      const store = configureStore(getInitialState())

            // configureStore will combine reducers
            // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

            // setup the router table with App selected as the initial component
            // note: See https://github.com/aksonov/react-native-router-flux/issues/948
      return (

        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key='root'>
              <Scene
                key='Main'
                component={Main}
                title='Home'
                initial
                hideNavBar
              />
              <Scene
                key='firstImage'
                component={Default}
                title='The first image'
                hideNavBar={false}
              />
              <Scene
                key='secondImage'
                component={Default}
                title='The second image'
                hideNavBar={false}
              />
            </Scene>
          </Router>
        </Provider>
      )
    }
  })
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('albumer', () => Albumer)
}
