import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screen/loginScreen/LoginScreen'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/stack/AppStack';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  return (
    <Provider store={store}>
       <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  );
};
export default App

const styles = StyleSheet.create({})