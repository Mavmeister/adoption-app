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
import AnimalProfile from '../screens/AnimalProfile';

export default class SavedScreen extends React.Component {
  state = {
    modalVisible: false,
    animalId: null,
  }

  setModalVisible = () => {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={styles.content}>
        <SavedList data={data} onPressItem={(id) => this.setState({animalId: id, modalVisible: true})}/>
        <AnimalProfile 
          visible={this.state.modalVisible} 
          id={this.state.animalId} 
          onClose={this.setModalVisible}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
