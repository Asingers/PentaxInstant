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
      window.pentaxAPI = new PentaxAPI('http://localhost:8000');
    } else {
      window.pentaxAPI = new PentaxAPI('http://192.168.0.1');
    }
  }

  componentDidMount() {
    // console.log('app.didMount', this.state);

    window.pentaxAPI.cameraInfo().then( (state) => {
      // console.log('cameraInfo', state);
      state.showSplash = false;
      return this.setState(state);
    }).then( (state) => {
      return window.pentaxAPI.listPhotos().then( (state) => {
        // console.log('listPhotos', state);
        return this.setState(state);
      })
    })
  }

  showPhotoInfo(photo) {
    // console.log('showPhotoInfo', photo);
    window.pentaxAPI.infoPhoto(photo.id).then( (state) => {
      // console.log('infoPhoto state', state);
      state.showSplash = false;
      state.viewPhoto = photo;
      return this.setState(state);
    })
  }

  render() {
    // console.log('app.render', this.state);

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
            onClickItem={this.showPhotoInfo.bind(this)}>
          </PhotoList>
          <PhotoView style={ styles.photoContainer }
            infoPhoto={this.state.infoPhoto}
            viewPhoto={this.state.viewPhoto}
          ></PhotoView>
        </View>
        
      )
    }
  }

}
