import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Modal
} from 'react-native';
import window from '../constants/Layout';
export default class AnimalProfile extends React.Component {

  render() {
    const { name, img, sex, age, profile } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: img}} />
        </View>
        <View >
          <Text style={styles.text}>{name}, {age}yr, {sex}</Text>
        </View>
        <ScrollView>
          <View style={{height: 450}}>
            <Text style={styles.profile}>{profile}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    height: window.window.height + 100,
    width: window.window.width,
    backgroundColor: '#FFF'
  },
  imageContainer: {
    alignItems:'center',
  },
  image: {
    height: window.window.height / 2,
    width: window.window.width - 10,
    // resizeMode: 'contain',
    borderRadius: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    lineHeight: 30,
    marginTop: 0,
    marginBottom: 10
  },
  profile: {
    lineHeight: 24,
    fontSize: 20,
  },
});
