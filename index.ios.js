/**
 * Simple React Native App
 * to display images from a Pentax camera over WiFi
 * and save them to the iOS Camera Roll
 * @jlev 2017
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  CameraRoll,
  ActivityIndicator
} from 'react-native';

export default class PentaxInstant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosJSON: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.fetchPhotosJSON();
  }

  fetchPhotosJSON() {
    console.log('fetchPhotosJSON');

    var url = 'http://localhost:8000/v1/photos';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log('jsonData', jsonData);

        this.setState({
          isLoading: false,
          photosJSON: jsonData.dirs
        });
      })
    .catch( error => console.log('Fetch error ' + error) );
  }

  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={'#fff'}
            size={'small'} 
            style={{margin: 15}} />
            <Text style={{color: '#fff'}}>Contacting Camera</Text>
      </View>
    );
  }

  renderResults() {
    var {photosJSON, isLoading} = this.state;
    console.log('photosJSON',photosJSON);
    return (
      <View>
        {photosJSON.map((folder, index) => {
          return(
            <Text key={index}>
              {folder.name}
            </Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});

AppRegistry.registerComponent('PentaxInstant', () => PentaxInstant);
