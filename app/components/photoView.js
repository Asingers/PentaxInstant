import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  CameraRoll,
} from 'react-native';
//import Image from 'react-native-image-progress';

import styles from '../styles';

export default class PhotoView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {infoPhoto, viewPhoto} = this.props;
    if (viewPhoto) {
      console.log('PhotoView.render', viewPhoto.view);
      return (
          <View>
            <StatusBar hidden={true} />
            <Image style={styles.fullscreenImage}
              key = { viewPhoto.id }
              resizeMode = "cover"
              style = {{width: 400, height: 400}}
              source = {{
                uri: viewPhoto.view,
                cache: 'reload'
               }}
            />
          </View>
        );
    } else {
      return null;
    }
  }
}