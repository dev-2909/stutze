import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screen/loginScreen/LoginScreen'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/stack/AppStack';
import FlashMessage from 'react-native-flash-message';
const linking = {
  prefixes: ['myapp://'], // your custom scheme
  config: {
    screens: {
      HomeScreen: 'home',
      LoginScreen: 'login',
      OTPScreen: 'otp',
    },
  },
};

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
       <NavigationContainer linking={linking}>
        <StackNavigator />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  );
};
export default App

const styles = StyleSheet.create({})