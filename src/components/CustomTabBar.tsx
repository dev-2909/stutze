import React, {useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import useCommanFn from '../screen/HomeScreen/MainCommanFn';
import {useSelector} from 'react-redux';
const icons = {
  Home: require('../assets/image/icons/homeIcon.png'),
  Search: require('../assets/image/icons/search.png'),
  Booking: require('../assets/image/icons/booking.png'),
  Profile: require('../assets/image/icons/profile-user.png'),
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {userData} = useSelector((state: any) => state.profile);
  const [imageUri, setImageUri] = useState('');
  const {convertImageToBase64} = useCommanFn();
  useEffect(() => {
    if (userData && userData?.profilePic?.data) {
      (async () => {
        const imgUrl: any = await convertImageToBase64(
          userData?.profilePic?.data,
        );
        setImageUri(imgUrl);
      })();
    }
  }, [userData]);
  useEffect(() => {
    (async () => {
      const imgUrlData: any = await convertImageToBase64(
        userData?.profilePic?.data,
      );
      setImageUri(imgUrlData);
    })();
  }, []);
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const labelTilte: any =
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
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tab}>
            {route.name === 'Profile' && imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={[
                  styles.icon,
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                  },
                ]}
              />
            ) : (
              <Image
                source={icons[route.name as keyof typeof icons]}
                style={[
                  styles.icon,
                  {tintColor: isFocused ? '#00D563' : '#AAA'},
                ]}
                resizeMode="contain"
              />
            )}

            <Text style={[styles.label, isFocused && {color: '#00D563'}]}>
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
    height: 100,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#AAA',
  },
});

export default CustomTabBar;
