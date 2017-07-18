import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  CameraRoll
} from 'react-native';

import PentaxAPI from './reducers/pentaxAPI';
import PhotoList from './components/photoList';
import styles from './styles';

export default class PentaxInstant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false
    }
    if (__DEV__) {
      console.log('running in debug mode');
      this.api = new PentaxAPI('http://localhost:8000');
    } else {
      this.api = new PentaxAPI('http://192.168.0.1');
    }

    this.photoList = new PhotoList();
  }

  componentDidMount() {
    console.log('app did mount');
  
    this.api.cameraInfo().then( (state) => {
      console.log('cameraInfo', state);
      this.setState(state);
    }).then( (state) => {
      return this.api.listPhotos().then( (state) => {
        console.log('listPhotos', state);
        this.setState(state);
        return this.photoList.render(state);
      })
    })
  }

  render() {
    var {isLoading, isError} = this.state;
    if (isLoading) 
      return this.renderLoadingMessage();
    if (isError)
      return this.renderConnectFailedMessage();
    else
      return this.photoList.render(this.state);
  }

  renderConnectFailedMessage() {
    if (__DEV__) {
      let steps = [
        'Make sure the mock-api server is running',
        'at '+this.api,
        'python mock-api/server.py'
      ];
    } else {
      let steps = [
        'Make sure the Pentax WiFi is on',
        'and your phone is connected to the network.'
      ];
    }
    
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: 'red'}}>Unable to Contact Camera</Text>
        <Text style={{color: 'white'}}>steps.join('<br />')</Text>
      </View>
    );
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={'#fff'}
            size={'small'} 
            style={{margin: 15}} />
            <Text style={{color: 'white'}}>Contacting Camera</Text>
      </View>
    );
  }
}
