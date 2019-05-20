import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Modal,
  Button
} from 'react-native';
import window from '../constants/Layout';
export default class AnimalProfile extends React.Component {

  render() {
    const { name, img, sex, age, profile, isModal } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: img}} />
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age} years</Text>
          <Text style={styles.sex}>{sex == 'M' ? 'Male' : 'Female'}</Text>
        </View>
        <ScrollView>
          <View style={{height: 500}}>
            <Text style={styles.profile}>{profile}</Text>
          </View>
        </ScrollView>
        {isModal && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.props.onClose}
              title="Close Profile"
              color="black"
            >
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    height: window.window.height,
    width: window.window.width,
    backgroundColor: '#abe0e8',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  buttonContainer: {
    marginBottom: 30,
    marginTop: 20,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems:'center',
  },
  image: {
    height: window.window.height / 2,
    width: window.window.width - 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  },
  name: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold'
  },
  age: {
    fontSize: 26,
    lineHeight: 30,
  },
  sex: {
    fontSize: 22,
    lineHeight: 30,
  },
  profile: {
    lineHeight: 24,
    fontSize: 20,
    marginBottom: 25
  },
});
