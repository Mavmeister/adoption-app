import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,

} from 'react-native';

// Sample data for dev
import data from '../data.json';
import SavedList from '../components/SavedList';
import { WebBrowser } from 'expo';

export default class SavedScreen extends React.Component {
  render() {
    return (
      <View style={styles.content}>
        <SavedList data={data} onPressItem={(id) => console.log(id)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
