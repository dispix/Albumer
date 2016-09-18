'use strict'
/**
 *  # Default component
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
import { Image, Dimensions } from 'react-native'

const style = {
  width: Dimensions.get('window').width - 25,
  height: Dimensions.get('window').height - 100,
  right: 0
}

/**
 * # Default view
 *
 */
const DefaultView = () =>
  <Image
    style={style}
    source={require(`../images/dota3.jpg`)}
  />

export default DefaultView
