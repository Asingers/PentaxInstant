import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Image from 'react-native-image-progress';
import PhotoGrid from 'react-native-photo-grid';

import styles from '../styles';

export default class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: {},
      dirs: [],
      photos: [],
      showItem: false
    }
  }

  render() {
    console.log('PhotoList.render');
    var {photos, camera} = this.state;
    console.log(photos, camera);

    return (
      <PhotoGrid ref="PhotoList"
        style={ styles.photoContainer }
        data = { photos }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { () => this.renderHeader(camera, photos.length) }
        renderItem = { this.renderPhoto }
        setState = { this.setState }
      ></PhotoGrid>
    );
  }

  renderHeader(camera, num_photos) {
    return (
      <View style={ styles.appHeader }>
        <Text style={{alignSelf: 'flex-start'}}>{camera.model}</Text>
        <Text style={{alignSelf: 'flex-end'}}>{num_photos} Photos</Text>
      </View>
    );
  }

  renderPhoto(item, itemSize) {
    console.log('PhotoList.renderPhoto', item);
    return(
      <TouchableHighlight
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          this.setState({showItem: item});
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.thumb }}
        />
      </TouchableHighlight>
    )
  }
}