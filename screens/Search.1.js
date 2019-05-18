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
import AnimalProfile from './AnimalProfile.1'
import data from '../data.json';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SearchScreen extends React.Component {
  constructor() {
    super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()]
    }

    this.saveOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    this.passOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        // TODO: use case / switch
        if (gestureState.dx > 120){
          Animated.spring(this.position, {toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}})
            .start(() => {
              // TODO new react state 
              this.setState({currentIndex: this.state.currentIndex + 1}, () => {
                this.position.setValue({x: 0, y: 0})
              })
            })
        } else if (gestureState.dx < 120){
          Animated.spring(this.position, {toValue: {x: - SCREEN_WIDTH - 100, y: gestureState.dy}})
            .start(() => {
              // TODO use new react state 
              this.setState({currentIndex: this.state.currentIndex + 1}, () => {
                this.position.setValue({x: 0, y: 0})
              })
            })
        } else {
          Animated.spring(this.position, {toValue: {x: 0, y: 0, friction: 4}}).start()
        }
      }
    })
  }
  
  renderAnimals = () => {
    return data.map((item, idx) => {
      if (idx < this.state.currentIndex){
        return null;
      } else if (idx == this.state.currentIndex){
        return (
          <Animated.View 
            {...this.PanResponder.panHandlers}
            style={[this.rotateAndTranslate, styles.animated]}
            key={item.id}
          >
            <Animated.View style={[{opacity: this.saveOpacity}, styles.savedView]}>
              <Text style={styles.save}>Save</Text>
            </Animated.View>
            <Animated.View style={[{opacity: this.passOpacity}, styles.passedView]}>
              <Text style={styles.pass}>Pass</Text>
            </Animated.View>
            <AnimalProfile {...item}/>
          </Animated.View>
        )
      } else {
        return (
          <Animated.View
            style={[{
              opacity: this.nextCardOpacity, 
              transform: [{scale: this.nextCardScale}]},
              styles.animated
            ]}
            key={item.id}>
            <AnimalProfile {...item}/>
          </Animated.View>
        )
      }
  }).reverse()
}
  render() {
    return (
      <View style={styles.content}>
        {this.renderAnimals()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  savedView: {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 1000,
    transform: [{rotate: '-30deg'}]
  },
  save: {
    color: 'green',
    borderWidth: 1,
    borderColor: 'green',
    fontWeight: '800',
    padding: 10,
    fontSize: 28
  },
  passedView: {
    position: 'absolute',
    top: 50,
    right: 50,
    zIndex: 1000,
    transform: [{rotate: '30deg'}]
  },
  pass: {
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
    fontWeight: '800',
    padding: 10,
    fontSize: 28
  },
  animated: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute',
  },
});
