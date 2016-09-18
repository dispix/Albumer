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
  height: Dimensions.get('window').height - 100
}

/**
 * # Default view
 *
 */
const Vignette = ({ source }) =>
  <Image
    style={style}
    source={source}
  />

export default Vignette
