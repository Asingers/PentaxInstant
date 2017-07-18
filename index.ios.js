/**
 * Simple React Native App
 * to display images from a Pentax camera over WiFi
 * and save them to the iOS Camera Roll
 * @jlev 2017
 */

import {
  AppRegistry
} from 'react-native';

import PentaxInstant from './app/index';

AppRegistry.registerComponent('PentaxInstant', () => PentaxInstant);
