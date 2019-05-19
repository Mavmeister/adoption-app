import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal
} from 'react-native';

// Sample data for dev
import data from '../data.json';
import SavedList from '../components/SavedList';
import AnimalProfile from '../screens/AnimalProfile.1';
import { connect } from 'react-redux';

class SavedScreen extends React.Component {
  state = {
    modalVisible: false,
    animalId: null,
  }

  setModalVisible = () => {
    this.setState({modalVisible: false});
  }

  render() {
    const singleAnimal = this.props.savedAnimals.find(animal => animal.id === this.state.animalId)
    return (
      <View style={styles.content}>
        <SavedList data={this.props.savedAnimals} onPressItem={(id) => this.setState({animalId: id, modalVisible: true})}/>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <AnimalProfile 
            isModal={true}
            visible={true}
            id={this.state.animalId}
            onClose={this.setModalVisible}
            {...singleAnimal}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffcd99'
  },
});

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  savedAnimals: state.data.savedAnimals,
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen)
