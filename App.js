import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Font, } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { store } from './store';
import { Provider } from 'react-redux'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'Open-Sans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'Open-Sans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
        'Open-Sans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
