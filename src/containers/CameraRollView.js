/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule CameraRollView
 */
'use strict'

import React from 'react'
import {
  ActivityIndicator,
  CameraRoll,
  Image,
  ListView,
  Platform,
  StyleSheet,
  View,
  groupByEveryN
} from 'react-native'

const propTypes = {
  /**
   * The group where the photos will be fetched from. Possible
   * values are 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream'
   * and SavedPhotos.
   */
  groupTypes: React.PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos'
  ]),

  /**
   * Number of images that will be fetched in one page.
   */
  batchSize: React.PropTypes.number,

  /**
   * A function that takes a single image as a parameter and renders it.
   */
  renderImage: React.PropTypes.func,

  /**
   * imagesPerRow: Number of images to be shown in each row.
   */
  imagesPerRow: React.PropTypes.number,

   /**
   * The asset type, one of 'Photos', 'Videos' or 'All'
   */
  assetType: React.PropTypes.oneOf([
    'Photos',
    'Videos',
    'All'
  ])

}

const CameraRollView = React.createClass({
  propTypes: propTypes,

  getDefaultProps: function () {
    return {
      groupTypes: 'SavedPhotos',
      batchSize: 5,
      imagesPerRow: 1,
      assetType: 'Photos',
      renderImage: function (asset) {
        const imageSize = 150
        const imageStyle = [styles.image, {width: imageSize, height: imageSize}]
        return (
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
        )
      }
    }
  },

  getInitialState: function () {
    const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged})

    return {
      assets: ([]),
      groupTypes: this.props.groupTypes,
      lastCursor: (null),
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      dataSource: ds
    }
  },

  /**
   * This should be called when the image renderer is changed to tell the
   * component to re-render its assets.
   */
  rendererChanged: function () {
    const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged})
    this.state.dataSource = ds.cloneWithRows(
      groupByEveryN(this.state.assets, this.props.imagesPerRow)
    )
  },

  componentDidMount: function () {
    this.fetch()
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.groupTypes !== nextProps.groupTypes) {
      this.fetch(true)
    }
  },

  _fetch: function (clear?) {
    if (clear) {
      this.setState(this.getInitialState(), this.fetch)
      return
    }

    const fetchParams = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType
    }
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor
    }

    CameraRoll.getPhotos(fetchParams)
      .then((data) => this._appendAssets(data), (e) => console.error(e))
  },

  /**
   * Fetches more images from the camera roll. If clear is set to true, it will
   * set the component to its initial state and re-fetch the images.
   */
  fetch: function (clear?) {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => { this._fetch(clear) })
    }
  },

  render: function () {
    return (
      <ListView
        renderRow={this._renderRow}
        renderFooter={this._renderFooterSpinner}
        onEndReached={this._onEndReached}
        style={styles.container}
        dataSource={this.state.dataSource}
      />
    )
  },

  _rowHasChanged: function (r1, r2) {
    if (r1.length !== r2.length) {
      return true
    }

    for (let i = 0; i < r1.length; i++) {
      if (r1[i] !== r2[i]) {
        return true
      }
    }

    return false
  },

  _renderFooterSpinner: function () {
    if (!this.state.noMore) {
      return <ActivityIndicator />
    }
    return null
  },

  // rowData is an array of images
  _renderRow: function (rowData, sectionID, rowID) {
    const images = rowData.map((image) => {
      if (image === null) {
        return null
      }
      return this.props.renderImage(image)
    })

    return (
      <View style={styles.row}>
        {images}
      </View>
    )
  },

  _appendAssets: function (data) {
    const assets = data.edges
    const newState = { loadingMore: false }

    if (!data.page_info.has_next_page) {
      newState.noMore = true
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor
      newState.assets = this.state.assets.concat(assets)
      newState.dataSource = this.state.dataSource.cloneWithRows(
        groupByEveryN(newState.assets, this.props.imagesPerRow)
      )
    }

    this.setState(newState)
  },

  _onEndReached: function () {
    if (!this.state.noMore) {
      this.fetch()
    }
  }
})

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1
  },
  url: {
    fontSize: 9,
    marginBottom: 14
  },
  image: {
    margin: 4
  },
  info: {
    flex: 1
  },
  container: {
    flex: 1
  }
})

export default CameraRollView
