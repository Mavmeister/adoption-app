import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import window from '../constants/Layout';
import Colors from '../constants/Colors';

export default class AnimalProfile extends React.Component {

  render() {
    const { name, img, sex, age, profile, isModal, height } = this.props;
    return (
      <View style={[{
        height: height ? height : window.window.height - 200,
        marginTop: isModal ? 80 : 20,
        marginBottom: isModal ? 80 : 20
        }, styles.content]}>
        <Image style={styles.image} source={{uri: img}} />
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age} years</Text>
          <Text style={styles.sex}>{sex == 'M' ? 'Male' : 'Female'}</Text>
        </View>
        <ScrollView>
            <Text style={styles.profile}>{profile}</Text>
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
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRightWidth: 2,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 2,
    borderColor: Colors.lightgray,
    borderRadius: 5,
    backgroundColor: Colors.white
  },
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray
  },
  buttonContainer: {
    width: 200,
    height: 40,
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    height: window.window.height / 3,
    width: window.window.width - 60,
    borderRadius: 5
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
  },
});
