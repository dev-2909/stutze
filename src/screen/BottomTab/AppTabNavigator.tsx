// src/navigation/AppTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../HomeScreen/HomeView';
import ProfileView from '../ProfileScreen/ProfileView';
import CustomTabBar from '../../components/CustomTabBar';
import BookingScreen from '../HomeScreen/BookingScreen';
import SearchServicesScreen from '../HomeScreen/SearchServicesScreen';


const Tab = createBottomTabNavigator();
const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Search" component={SearchServicesScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
