import React from 'react';
import {
  StyleSheet,
  View,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import SavedList from '../components/SavedList';
import AnimalProfile from './AnimalProfile';

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

const mapStateToProps = (state) => ({
  savedAnimals: state.data.savedAnimals,
})

export default connect(mapStateToProps, null)(SavedScreen)
