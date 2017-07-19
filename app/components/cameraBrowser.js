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

  _onDetail(media, index) {
    console.log('_onDetail', media, index);
  }

  _onLongPress(media, index) {
    console.log('_onLongPress', media, index);
  }

  render() {
    return (
      <PhotoBrowser
        mediaList={this.props.media}
        initialIndex={0}
        displayNavArrows={true}
        displayTopBar={true}
        displaySelectionButtons={false}
        displayActionButton={true}
        displayDetailButton={true}
        startOnGrid={true}
        enableGrid={true}
        useCircleProgress={false}
        //onDetail={this._onDetail}
        onPhotoLongPress={this._onLongPress}
        // delayLongPress={500}
        onActionButton={this._onActionButton}
      />
    );
  }
}