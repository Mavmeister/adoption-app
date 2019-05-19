import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class EmptyList extends React.Component {

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.header}>No Saved Pets Available</Text>
          <Text style={styles.empty}>Save your favorite pets by swiping right in the Search tab</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 200,
    fontSize: 34
  },
  empty: {
    fontSize: 24,
    padding: 20,
    textAlign: 'center'
  }
})
