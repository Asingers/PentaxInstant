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
  }

  render() {
    console.log('PhotoList.render', this.props);

    return (
      <PhotoGrid
        style={ styles.photoContainer }
        data = { this.props.photos }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { () => this.renderHeader(this.props) }
        renderItem = { (item, itemSize) => this.renderPhoto(item, itemSize, this.props.onClick) }
      ></PhotoGrid>
    );
  }

  renderHeader(props) {
    console.log('PhotoList.renderHeader', props);
    return (
      <View style={ styles.appHeader }>
        <Text style={{alignSelf: 'flex-start', color:'white'}}>{props.camera.model}</Text>
        <Text style={{alignSelf: 'flex-end', color:'white'}}>{props.photos.length | 0} Photos</Text>
      </View>
    );
  }

  renderPhoto(item, itemSize, onPress) {
    console.log('PhotoList.renderPhoto', this);
    return(
      <TouchableHighlight
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => onPress(item) }>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.thumb }}
        />
      </TouchableHighlight>
    )
  }
}