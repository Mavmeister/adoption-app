import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import { fetchSettings, updateSettings, fetchAnimals } from '../actions';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ageRange: {
        min: "1",
        max: "10"
      }
  }
}

  componentWillMount() {
    this.props.fetchSettings()
  }

  render() {
    const { profile, typePreference } = this.props.settings;

    // Methods to modify settings for the user's profile
    changeAnimal = (isDog) => {
      const typePreference = isDog === false ? 'cat' : 'dog';
      this.props.updateSettings({typePreference})
      this.props.fetchAnimals()
    }
    changeProfile = (profile) => {
      this.props.updateSettings({"profile": profile})
    }
    changeAge = (age) => {
      this.setState({ageRange: Object.assign(this.state.ageRange, age)}, () => {
        this.props.updateSettings({"ageRange": this.state.ageRange})
      })
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.content} behavior="padding">
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
              <Text style={{fontSize: 24}}>Animal:</Text>
              <Text style={{fontSize: 22, lineHeight: 32, marginLeft: 40}}>Cat</Text>
              <Switch
                trackColor={{false: '#FA932B', true: '#2DC0CF'}}
                ios_backgroundColor={'#FA932B'}
                onValueChange={changeAnimal}
                value={typePreference == 'cat' ? false : true}
                style={styles.switch}
              />
              <Text style={{fontSize: 22, lineHeight: 32, marginRight: 20}}>Dog</Text>
            </View>
            <View style={styles.age}>
              <Text style={{fontSize: 24, marginRight: 50}}>Age:</Text>
              <TextInput
                textAlign={'center'}
                returnKeyType="done"
                keyboardType={"number-pad"}
                style={styles.field}
                placeholder="Min"
                value={this.state.ageRange.min}
                maxLength={2}
                onChangeText={(age) => changeAge({"min": age})}
              /> 
              <Text>-</Text>
              <TextInput
                textAlign={'center'}
                returnKeyType="done"
                keyboardType={"number-pad"}
                style={styles.field}
                placeholder="Max"
                value={this.state.ageRange.max}
                maxLength={2}
                onChangeText={(age) => changeAge({"max": age})}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f1ffed',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Open-Sans-Bold'
  },
  description: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 5,
    height: '50%',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Open-Sans-Light'
  },
  preferences: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  animal: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    fontFamily: 'Open-Sans-Light'
  },
  age: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Open-Sans-Light',
    marginBottom: 20
  },
  field: {
    width: 70,
    height: 40,
    lineHeight: 28,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
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
