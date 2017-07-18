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
      showSplash: true
    }

    if (__DEV__) {
      console.log('running in debug mode');
      this.api = new PentaxAPI('http://localhost:8000');
    } else {
      this.api = new PentaxAPI('http://192.168.0.1');
    }
  }

  componentWillMount() {
    this.loadingScreen = new LoadingScreen();
    this.photoList = new PhotoList();
    this.photoView = new PhotoView();
  }

  componentDidMount() {
    console.log('app.didMount', this.state);

    this.api.cameraInfo().then( (state) => {
      console.log('cameraInfo', state);
      console.log('remove splash')
      return this.setState({showSplash: false});
    }).then( (state) => {
      return this.api.listPhotos().then( (state) => {
        console.log('listPhotos', state);
        return this.setState(state);
      })
    })
  }

  componentDidUpdate() {
    console.log('app.didUpdate', this);
    this.loadingScreen.setState(this.state);
    this.photoList.setState(this.state);
  }

  render() {
    console.log('app.render', this.state);
    // this.photoList.render();
    // this.photoView.render();

    var {showSplash} = this.state;
    if (showSplash) {
      return (<View style={styles.loadingContainer}>
        <Text style={{color: 'white'}}>PentaxInstant</Text>
      </View>);
    } else {
      return this.loadingScreen.render();
    }
  }

}
