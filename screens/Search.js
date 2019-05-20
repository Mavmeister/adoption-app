import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimalProfile from './AnimalProfile'
import { fetchAnimals, fetchSettings, saveAnimals } from '../actions';
import { connect } from 'react-redux';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Colors from '../constants/Colors';

class SearchScreen extends React.Component {

  componentWillMount() {
    this.props.fetchAnimals()
    this.props.fetchSettings()
  }
  
  renderAnimals = (animals) => {
    // TODO: FIX ISSUE WITH DISAPPEARING ANIMALS
    return animals.map((item, idx) => {
      return <Card key={idx} style={styles.card}><AnimalProfile {...item} /></Card>
    })
  }
  
  // Filters animals based on Type and Age
  filteredAnimals = (animals, type, ageRange) => {
    return animals
      .filter(animal => animal.type === type)
      .filter(animal => animal.age >= ageRange.min && animal.age <= ageRange.max)
  }

  render() {
    const animals = this.props.animals;
    let { typePreference, ageRange } = this.props.settings;
    const selectedAnimals = this.filteredAnimals(animals, typePreference, ageRange)

    return (
      <View style={styles.content}>
        <CardStack
          outputRotationRange={['-20deg', '0deg', '20deg']}
          ref={swiper => { this.swiper = swiper }}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          verticalSwipe={false}
          onSwipedRight={(idx) => this.props.saveAnimals(selectedAnimals[idx])}
          // onSwipedLeft={(idx) => this.props.saveAnimals(animals[idx])}
          renderNoMoreCards={() => 
            <View style={styles.noCards}>
              <Text style={{fontSize: 20}}>Sorry, no more pets available!</Text>
            </View>}
        >
          {this.renderAnimals(selectedAnimals)}
        </CardStack>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.orange
  },
  noCards: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    height: 500,
    backgroundColor: Colors.orange
  },
  savedView: {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 1000,
    transform: [{rotate: '-30deg'}]
  },
  save: {
    color: Colors.green,
    borderWidth: 1,
    borderColor: Colors.green,
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
    color: Colors.orange,
    borderWidth: 1,
    borderColor: Colors.orange,
    fontWeight: '800',
    padding: 10,
    fontSize: 28
  },
});

const mapDispatchToProps = {
  fetchAnimals,
  fetchSettings,
  saveAnimals
};

const mapStateToProps = (state) => ({
  animals: state.data.animals,
  settings: state.data.settings
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
