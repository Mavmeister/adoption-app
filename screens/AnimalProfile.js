import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';

export default class AnimalProfile extends React.Component {

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.props.id}</Text>

              <TouchableHighlight
                onPress={this.props.onClose}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  animated: {
    padding: 10,
    backgroundColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'blue'
  },
});
