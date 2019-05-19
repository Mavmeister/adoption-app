import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { fetchSettings, updateSettings, fetchAnimals } from '../actions';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ageMin: 0,
      ageMax: 100,
      isCat: false,
      profile: 'I love all animals! I live in a nice big house on an acre of land, the pets will have plenty of room to run around and have fun. I work from home too so I will always be available to them. I grew up on a farm and have a great deal of experience working with animals.'
    }
  }

  componentWillMount() {
    this.props.fetchSettings()
  }

  render() {
    const { profile, typePreference, ageRange } = this.props.settings;

    changeAnimal = (isDog) => {
      const typePreference = isDog === false ? 'cat' : 'dog';
      this.props.updateSettings({"typePreference": typePreference})
      this.props.fetchAnimals()
    }
    changeProfile = (profile) => {
      this.props.updateSettings({"profile": profile})
    }
    changeAge = (ageRange) => {
      console.log(ageRange)
      const { max, min } = ageRange;
      this.props.updateSettings({"ageRange": {"min": min, "max": max}})
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>
          <Text style={styles.header}>Adopter Profile</Text>
          <View style={styles.description}>
            <TextInput 
              returnKeyLabel="done"
              multiline={true}
              style={{fontSize: 18, height: '100%'}}
              editable={true}
              maxLength={1000}
              defaultValue={profile}
              onChangeText={(text) => changeProfile(text)}
              />
          </View>
          <Text style={styles.header}>Preferences</Text>
          <View style={styles.preferences}>
            <View style={styles.animal}>
              <Text style={{fontSize: 20}}>Animal:</Text>
              <Text style={{fontSize: 20}}>Cat</Text>
              <Switch
                trackColor={{false: 'red', true: 'blue'}}
                ios_backgroundColor={'red'}
                onValueChange={changeAnimal}
                value={typePreference == 'cat' ? false : true}
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
                value={ageRange.min.toString()}
                maxLength={2}
                onChangeText={(age) => changeAge({ageRange: {"min": age}})}
              /> 
              <Text>-</Text>
              <TextInput
                textAlign={'center'}
                returnKeyType="done"
                keyboardType={"number-pad"}
                style={styles.field}
                placeholder="Max"
                value={ageRange.max.toString()}
                maxLength={2}
                onChangeText={(age) => changeAge({ageRange: {"max": age}})}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: '#BDD9B5',
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Open-Sans-Regular'
  },
  description: {
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    height: '50%',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Open-Sans-Light'
  },
  preferences: {
    flex: 1,
  },
  animal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Open-Sans-Light'

  },
  age: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Open-Sans-Light'

  },
  field: {
    width: 100,
    height: 50,
    lineHeight: 24,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});

const mapDispatchToProps = {
  fetchSettings,
  updateSettings,
  fetchAnimals
};

const mapStateToProps = (state) => ({
  settings: state.data.settings
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
