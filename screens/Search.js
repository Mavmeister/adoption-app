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
import { fetchAnimals, fetchSettings } from '../actions';
import { connect } from 'react-redux';
import CardStack, { Card } from 'react-native-card-stack-swiper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class SearchScreen extends React.Component {
  constructor() {
    super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
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
  }

  componentWillMount() {
    this.props.fetchAnimals()
    this.props.fetchSettings()
  }
  
  renderAnimals = (animals, typePreference) => {
    const filtered = animals.filter(animal => animal.type === typePreference)
    return filtered.map((item, idx) => {
      return <Card key={idx}><AnimalProfile {...item} /></Card>
    })
}
  render() {
    const animals = this.props.animals;
    const { typePreference } = this.props.settings;
    return (
      <View style={styles.content}>
        <CardStack 
          style={styles.content} 
          ref={swiper => { this.swiper = swiper }}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          verticalSwipe={false}
          renderNoMoreCards={() => 
            <View style={styles.noCards}>
              <Text style={{fontSize: 20}}>Sorry, no more pets available!</Text>
            </View>}
        >
          {this.renderAnimals(animals, typePreference)}
        </CardStack>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  noCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    height: 100,
    width: 'auto',
    backgroundColor: '#FFFF'
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

const mapDispatchToProps = {
  fetchAnimals,
  fetchSettings
};

const mapStateToProps = (state) => ({
  animals: state.data.animals,
  settings: state.data.settings
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
