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
  }

  render() {
    var {loading, camera, error} = this.props;
    if (loading) {
      return this.renderConnnectingMessage();
    }
    if (error) {
      return this.renderConnectFailedMessage();
    }
    
    if (camera) {
      return this.renderLoadingMessage(camera);
    } else {
      return null;
    }
  }

  renderConnnectingMessage() {
    return (
      <View>
          <ActivityIndicator
            animating={true}
            color={'white'}
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
      <View>
        <Text style={{color: 'red'}}>Unable to Contact Camera</Text>
        <Text style={{color: 'white'}}>steps.join('<br />')</Text>
      </View>
    );
  }

  renderLoadingMessage(camera) {
    return (
      <View>
          <ActivityIndicator
            animating={true}
            color={'white'}
            size={'small'} 
            style={{margin: 15}} />
            <Text style={{color: 'white'}}>Connected to {camera.model}</Text>
      </View>
    );
  }
}