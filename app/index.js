import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import PentaxAPI from './lib/pentaxAPI';
import LoadingScreen from './components/loadingScreen';
import CameraBrowser from './components/cameraBrowser';
import PhotoInfo from './components/photoInfo';
import styles from './styles';

export default class PentaxInstant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: [],
      infoPhoto: {},
    }

    if (__DEV__) {
      console.log('running in debug mode');
      window.pentaxAPI = new PentaxAPI('http://localhost:8000');
    } else {
      window.pentaxAPI = new PentaxAPI('http://192.168.0.1');
    }
  }

  componentDidMount() {
    console.log('app.didMount', this.state);

    window.pentaxAPI.cameraInfo().then( (state) => {
      return this.setState(state);
    }).then( (state) => {
      return window.pentaxAPI.listPhotos().then( (state) => {
        console.log('listPhotos', state);
        return this.setState(state);
      })
    })
  }

  showPhotoInfo(photo) {
    // console.log('showPhotoInfo', photo);
    window.pentaxAPI.infoPhoto(photo.id).then( (state) => {
      console.log('infoPhoto state', state);
      state.viewPhoto = photo;
      return this.setState(state);
    })
  }

  render() {
    // console.log('app.render', this.state);
    if (this.state.loading) {
      return (
        <LoadingScreen style={styles.splashContainer}
            loading={this.state.loading}>
        </LoadingScreen>
      );
    } else {
      return (
        <View style={styles.appContainer}>
          <CameraBrowser
            media={this.state.photos}
            showInfo={this.showPhotoInfo.bind(this)}>
          </CameraBrowser>
          <PhotoInfo 
            displayed={true}
            height={120}
            infoPhoto={this.state.infoPhoto}
          />
        </View>
      )
    }
  }
}
