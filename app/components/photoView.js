import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  CameraRoll
} from 'react-native';
import Image from 'react-native-image-progress';

import styles from '../styles';

export default class PhotoView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PhotoView.render');
    var {infoPhoto, viewPhoto} = this.props;
    return (
        <View style={ styles.photoContainer }>
          <Image
            resizeMode = "cover"
            style = {{ flex: 1 }}
            source = {{ uri: viewPhoto.view }}
          />
        </View>
      );
    }
}