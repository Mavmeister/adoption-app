import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions, 
  Animated, 
  PanResponder
} from 'react-native';
import { WebBrowser } from 'expo';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
  }

  renderAnimals = () => {
    return null
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

      }
    })
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.header}>Adopter Profile</Text>
        <View style={styles.description}>
          <Text>profile info from dog</Text>
        </View>
        <Text style={styles.header}>Preferences</Text>
        <View style={styles.preferences}></View>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 15
  },
  header: {
    fontSize: 24,
    marginBottom: 5
  },
  description: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    height: '50%',
    padding: 10,
    marginBottom: 20
  },
  preferences: {

  }

});
