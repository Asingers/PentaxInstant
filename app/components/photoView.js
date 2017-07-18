import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  CameraRoll
} from 'react-native';
import Image from 'react-native-image-progress';

import styles from '../styles';

export default class PhotoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        info: {},
        photo: {}
    }
  }

  render() {
    console.log('PhotoView.render');
    var {info, photo} = this.state;
    return (
        <View style={ styles.photoContainer } ref="PhotoView">
          <Image
            resizeMode = "cover"
            style = {{ flex: 1 }}
            source = {{ uri: photo.view }}
          />
        </View>
      );
    }
}