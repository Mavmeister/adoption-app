import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class SavedListItem extends React.Component {

  onPress = () => {
    this.props.onPressItem(this.props.id);
  }

  render() {
    const { name, img, sex, age, profile } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress} >
        <View style={styles.content}>
          <View>
            <Image style={styles.image} source={{uri: img}} />
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {name}, {age}yr, {sex}
            </Text>
            <Text numberOfLines={2} style={styles.description}>{profile}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    height: 105,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'space-between'
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 24,
    lineHeight: 24
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
  }
})