import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  CameraRoll
} from 'react-native';
import Image from 'react-native-image-progress';
import PhotoGrid from 'react-native-photo-grid';

import styles from '../styles';

export default class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: {},
      dirs: {},
      photos: {}
    }
  }

  render(state) {
    console.log('PhotoList.render');
    return (
      <PhotoGrid style={ styles.photoContainer }
        data = { state.photos }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { () => this.renderHeader(state) }
        renderItem = { this.renderPhotoPreview }
      ></PhotoGrid>
    );
  }

  renderHeader(state) {
    return (
      <View style={ styles.appHeader }>
        <Text style={{alignSelf: 'flex-start'}}>{state.camera.model}</Text>
        <Text style={{alignSelf: 'flex-end'}}>{state.photos.length} Photos</Text>
      </View>
    );
  }

  renderPhotoPreview(item, itemSize) {
    console.log('PhotoList,renderPhotoPreview', item);
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{
            uri: item.src
          }}
        />
      </TouchableOpacity>
    )
  }
}