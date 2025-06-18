import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';


const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const labelTilte =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName =
          route.name === 'Home'
            ? 'home'
            : route.name === 'Orders'
            ? 'shopping-bag'
            : 'person';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tab}
          >
            {/* <Icon
              name={iconName}
              size={26}
              color={isFocused ? '#00D563' : '#AAA'}
            /> */}
            <Text style={[styles.label, isFocused && { color: '#00D563' }]}>
              {labelTilte}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    justifyContent: 'space-around',
    borderTopColor: '#333',
    borderTopWidth: 1,
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#AAA',
  },
});

export default CustomTabBar;
