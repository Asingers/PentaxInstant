import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  splashContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  appHeader: {
    marginTop: 20,
    marginLeft: 7,
    marginRight: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  fullscreenImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  }
});
export default styles;