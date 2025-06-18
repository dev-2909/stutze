// src/navigation/AppTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../HomeScreen/HomeView';
import ProfileView from '../ProfileScreen/ProfileView';
import CustomTabBar from '../../components/CustomTabBar';


const Tab = createBottomTabNavigator();
const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Search" component={ProfileView} />
      <Tab.Screen name="Booking" component={ProfileView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
