import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import styles from '../styles';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      isLoading: true,
      isError: false
    }
  }

  render() {
    var {isConnected, isLoading, isError} = this.state;
    if (!isConnected) {
      return this.renderConnnectingMessage();
    }
    if (isError) {
      return this.renderConnectFailedMessage();
    }
    
    if (isLoading) {
      return this.renderLoadingMessage(this.state.camera);
    } else {
      return null;
    }
  }

  renderConnnectingMessage() {
    return (
      <View style={styles.loadingContainer} ref="ConnectingMessage">
          <ActivityIndicator
            animating={true}
            color={'#fff'}
            size={'small'} 
            style={{margin: 15}} />
            <Text style={{color: 'white'}}>Contacting Camera</Text>
      </View>
    );
  }

  renderConnectFailedMessage(api_url) {
    if (__DEV__) {
      let steps = [
        'Make sure the mock-api server is running',
        'at '+api_url,
        'python mock-api/server.py'
      ];
    } else {
      let steps = [
        'Make sure the Pentax WiFi is on',
        'and your phone is connected to the network.'
      ];
    }
    
    return (
      <View style={styles.loadingContainer} ref="ConnectFailedMessage">
        <Text style={{color: 'red'}}>Unable to Contact Camera</Text>
        <Text style={{color: 'white'}}>steps.join('<br />')</Text>
      </View>
    );
  }

  renderLoadingMessage(camera) {
    return (
      <View style={styles.loadingContainer} ref="LoadingMessage">
          <ActivityIndicator
            animating={true}
            color={'#fff'}
            size={'small'} 
            style={{margin: 15}} />
            <Text style={{color: 'white'}}>Connected to {camera.model}</Text>
      </View>
    );
  }
}