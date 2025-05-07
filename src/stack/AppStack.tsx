import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../screen/HomeScreen/HomeView';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import OTPScreen from '../screen/loginScreen/OTPScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  OTPScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null); // null = loading
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('LoginScreen');
  
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('authToken');
      const otpVerified = await AsyncStorage.getItem('otpVerified');
  
      if (token && otpVerified === "true") {
        setInitialRoute('HomeScreen');
        setIsLogin(false)
      } else {
        setInitialRoute('LoginScreen');
        setIsLogin(false)
      }
  
      // setIsReady(true);
    })();
  }, []);
  


  if (isLogin === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log('initialRoute',initialRoute);
  
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="HomeScreen" component={HomeView} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
