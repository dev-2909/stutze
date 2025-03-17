import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screen/loginScreen/LoginScreen'
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <LoginScreen />
      </View>
    </Provider>
  );
};
export default App

const styles = StyleSheet.create({})