/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as globalActions from '../reducers/global/globalActions'

/**
 * Router
 */
import { Actions } from 'react-native-router-flux'

/**
 * The components needed from React
 */
import React, { Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  CameraRoll
}
from 'react-native'

/**
 * Camera roll
 *
 */
import CameraRollView from './CameraRollView'

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 80
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10
  },
  cameraRoll: {
    backgroundColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  }
})

/**
 * ## App class
 */
class Main extends Component {
  componentWillMount () {

  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your images:
        </Text>
        <View style={styles.cameraRoll}>
          <CameraRollView />
        </View>
      </View>
    )
  }
}

/**
 * ### Main PropTypes
 *
 * Ensure props are correctly passed to the component
 */
Main.propTypes = {
  global: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
