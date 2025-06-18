import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../screen/HomeScreen/HomeView';
import LoginScreen from '../screen/loginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import OTPScreen from '../screen/loginScreen/OTPScreen';
import ProfileView from '../screen/ProfileScreen/ProfileView';
import EditProfileScreen from '../screen/ProfileScreen/EditProfileScreen';
import useAuthInit from './useAuthInit';
import ServiceScreen from '../screen/HomeScreen/ServiceScreen';
import AppTabNavigator from '../screen/BottomTab/AppTabNavigator';

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  OTPScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  ServiceScreen: undefined;
  AppTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const StackNavigator = () => {
  const { initialRoute, loading } = useAuthInit();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="HomeScreen" component={HomeView} />
      <Stack.Screen name="ProfileScreen" component={ProfileView} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
