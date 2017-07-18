import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PentaxAPI from './reducers/pentaxAPI';
import LoadingScreen from './components/loadingScreen';
import PhotoList from './components/photoList';
import PhotoView from './components/photoView';
import styles from './styles';

export default class PentaxInstant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      loading: '',
      camera: {},
      photos: [],
      dirs: [],
      infoPhoto: {},
      viewPhoto: {},
      downloadLink: ''
    }

    if (__DEV__) {
      console.log('running in debug mode');
      window.api = new PentaxAPI('http://localhost:8000');
    } else {
      window.api = new PentaxAPI('http://192.168.0.1');
    }
  }

  componentDidMount() {
    console.log('app.didMount', this.state);

    window.api.cameraInfo().then( (state) => {
      console.log('cameraInfo', state);
      state.showSplash = false;
      return this.setState(state);
    }).then( (state) => {
      return window.api.listPhotos().then( (state) => {
        console.log('listPhotos', state);
        return this.setState(state);
      })
    })
  }

  showPhotoInfo(photo) {
    console.log('showPhotoInfo', photo, this);
    window.api.infoPhoto(photo.id).then( (state) => {
      console.log('infoPhoto', state);
      state.showSplash = false;
      // this is not set to the app after onPress callback
      // WTF?
      return this.setState(state);
    })
  }

  render() {
    console.log('app.render', this.state);

    if (this.state.showSplash) {
      return (
        <View style={styles.appContainer}>
          <View style={styles.appHeader}>
            <Text style={{color: 'white'}}>PentaxInstant</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.appContainer}>
          <LoadingScreen style={styles.splashContainer}
            loading={this.state.loading}>
          </LoadingScreen>
          <PhotoList
            photos={this.state.photos}
            dirs={this.state.dirs}
            camera={this.state.camera}
            onClick={this.showPhotoInfo}>
          </PhotoList>
          <PhotoView
            infoPhoto={this.state.infoPhoto}
            viewPhoto={this.state.viewPhoto}
          ></PhotoView>
        </View>
      )
    }
  }

}
