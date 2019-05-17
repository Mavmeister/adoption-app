import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Keyboard
} from 'react-native';

export default class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ageMin: 0,
      ageMax: 100,
      isCat: false,
      profile: 'I love all animals! I live in a nice big house on an acre of land, the pets will have plenty of room to run around and have fun. I work from home too so I will always be available to them. I grew up on a farm and have a great deal of experience working with animals.'
    }
  }

  render() {

    changeAnimal = (animal) => {
      this.setState({isCat: !this.state.isCat})
      console.log('Animal:', this.state.isCat)
    }

    return (
      <View style={styles.content}>
        <Text style={styles.header}>Adopter Profile</Text>
        <View style={styles.description}>
          <TextInput 
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            multiline={true}
            style={{fontSize: 18}}
            editable={true}
            maxLength={1000}
            defaultValue={this.state.profile}
          />
        </View>
        <Text>{this.state.ageMin}, {this.state.ageMax}</Text>
        <Text style={styles.header}>Preferences</Text>
        <View style={styles.preferences}>
          <View style={styles.animal}>
            <Text style={{fontSize: 20}}>Animal:</Text>
            <Text style={{fontSize: 20}}>Cat</Text>
            <Switch
              trackColor={{false: 'red', true: 'blue'}}
              ios_backgroundColor={'red'}
              onValueChange={changeAnimal}
              value={this.state.isCat}
              style={{transform: [{ scaleX: 2 }, { scaleY: 1.5 }]}}
            />
            <Text style={{fontSize: 20}}>Dog</Text>
          </View>
          <View style={styles.age}>
            <Text style={{fontSize: 20, marginRight: 50}}>Age:</Text>
            <TextInput
              textAlign={'center'}
              returnKeyType="done"
              keyboardType={"number-pad"}
              style={styles.field}
              placeholder="Min"
              maxLength={2}
              onChangeText={(ageMin) => this.setState({ageMin})}
            /> 
            <Text>-</Text>
            <TextInput
              textAlign={'center'}
              returnKeyType="done"
              keyboardType={"number-pad"}
              style={styles.field}
              placeholder="Max"
              maxLength={2}
              onChangeText={(ageMax) => this.setState({ageMax})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: 'lightgray',
  },
  header: {
    fontSize: 24,
    marginBottom: 5
  },
  description: {
    borderColor: 'black',
    borderWidth: 1,
    height: '50%',
    padding: 10,
    marginBottom: 20,
  },
  preferences: {
    flex: 1,
  },
  animal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  age: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  field: {
    width: 100,
    height: 50,
    lineHeight: 24,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10
  },
});
