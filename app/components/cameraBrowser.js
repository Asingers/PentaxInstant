import React, { Component } from 'react';
import {
  Platform,
  ActionSheetIOS
} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import styles from '../styles';

export default class CameraBrowser extends Component {
  constructor(props) {
    super(props);
  }

  media() {
    // transform array of "photo" objects to "media"
    return Array.apply(null, this.props.photos).map((photo) => {
      return {
        thumb: photo.thumb,
        photo: photo.view,
        caption: photo.file,
      }
    });
  }

  _onActionButton(media, index) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: media.photo,
        message: media.caption,
      },
      () => {},
      () => {});
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  }

  render() {
    return (
      <PhotoBrowser
        mediaList={this.media()}
        initialIndex={0}
        displayNavArrows={true}
        displayTopBar={true}
        displaySelectionButtons={false}
        displayActionButton={true}
        startOnGrid={true}
        enableGrid={true}
        useCircleProgress={false}
        onSelectionChanged={this._onSelectionChanged}
        onActionButton={this._onActionButton}
      
      />
    );
  }
}