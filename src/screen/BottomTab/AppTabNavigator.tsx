import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeView from '../HomeScreen/HomeView';
import ProfileView from '../ProfileScreen/ProfileView';
import CustomTabBar from '../../components/CustomTabBar';
import BookingScreen from '../HomeScreen/BookingScreen';
import SearchServicesScreen from '../HomeScreen/SearchServicesScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const AppTabNavigator = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeView} />
        <Tab.Screen name="Search" component={SearchServicesScreen} />
        <Tab.Screen name="Booking" component={BookingScreen} />
        <Tab.Screen name="Profile" component={ProfileView} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default AppTabNavigator;
