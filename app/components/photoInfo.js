import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { BarContainer, BAR_POSITIONS } from 'react-native-photo-browser/lib/bar/BarContainer';
const BUTTON_WIDTH = 40;

export default class PhotoInfo extends React.Component {
  static propTypes = {
    displayed: PropTypes.bool,
    height: PropTypes.number,
    infoPhoto: PropTypes.object,
  };

  static defaultProps = {
    displayed: false,
    infoPhoto: {},
  };


  render() {
    const { displayed, height, infoPhoto } = this.props;

    if (infoPhoto.datetime) {
      return (
        <BarContainer
          position={BAR_POSITIONS.BOTTOM}
          displayed={displayed}
          height={height}
          style={styles.container}
        >
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{infoPhoto.datetime}</Text>
            <Text style={styles.caption}>AV: {infoPhoto.av} ISO: {infoPhoto.sv} TV: {infoPhoto.tv}</Text>
            <Text style={styles.caption}>{infoPhoto.latlng}</Text>
          </View>
        </BarContainer>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  captionContainer: {
    flex: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  caption: {
    color: 'white',
    alignSelf: 'center',
    paddingTop: 8,
  },
  arrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    width: BUTTON_WIDTH,
  },
  buttonImage: {
    marginTop: 8,
  },
});