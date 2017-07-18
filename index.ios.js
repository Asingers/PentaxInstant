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
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  CameraRoll
} from 'react-native';
import Image from 'react-native-image-progress';
import PhotoGrid from 'react-native-photo-grid';

export default class PentaxInstant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //camera: 'tbd',
      dirs: {},
      photos: {},
      isLoading: true
    }
    if (__DEV__) {
      console.log('running in debug mode');
      this.api = 'http://localhost:8000';
    } else {
      this.api = 'http://192.168.0.1';
    }
  }

  componentDidMount() {
    this.fetchPhotosList();
  }

  fetchPhotosList() {
    console.log('fetchPhotosList');

    var url = this.api+'/v1/photos';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log('jsonData', jsonData);
        let photos = Array.apply(null, jsonData.dirs).reduce((dirs, dir) => {
          return dirs.concat(Array.apply(null, dir.files).reduce((files, b) => {
            return files.concat({ id: b, src: url+'/'+dir.name+'/'+b });
          }, []));
        }, []);

        this.setState({
          isLoading: false,
          dirs: jsonData.dirs,
          photos: photos,
        });
      })
    .catch( error => {
      console.log('Fetch error ' + error)
      this.setState({
          isLoading: false,
          isError: true
        });
    });
  }

  render() {
    var {isLoading, isError} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      if (isError)
        return this.renderConnectFailedMessage();
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

  renderResults() {
    var {photos, isLoading} = this.state;
    console.log('photos', photos);
    return (
      <PhotoGrid style={ styles.photoContainer }
        data = { photos }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { this.renderHeader }
        renderItem = { this.renderPhotoPreview }
      ></PhotoGrid>
    );
  }

  renderHeader() {
    return (
      <Text style={ styles.appHeader }>Pentax Photos</Text>
    );
  }

  renderPhotoPreview(item, itemSize) {
    console.log('renderPhotoPreview', item);
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{
            uri: item.src,
            headers: { Range: "bytes=100-200" }
          }}
        />
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  appHeader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('PentaxInstant', () => PentaxInstant);
