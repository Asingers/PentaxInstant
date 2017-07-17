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
  ActivityIndicator,
  TouchableOpacity,
  CameraRoll
} from 'react-native';
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
  }

  componentDidMount() {
    this.fetchPhotosList();
  }

  fetchPhotosList() {
    console.log('fetchPhotosList');

    var url = 'http://localhost:8000/v1/photos';
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
          source = {{ uri: item.src }}
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
