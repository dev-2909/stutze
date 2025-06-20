import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../stack/AppStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {time} from 'console';
import {title} from 'process';
import HeaderComponent from '../../components/HeaderComponent';

interface User {
  name: string;
  email: string;
  profilePic: {
    data: number[];
  };
}
type ProfileNav = NativeStackNavigationProp<RootStackParamList>;
const ProfileView = () => {
  const [user, setUser] = useState<User | null>(null);
  const [imageUri, setImageUri] = useState<string>('');
  console.log('user', user);
  const navigation = useNavigation<ProfileNav>();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch('http://10.0.2.2:5000/api/getUser', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const res = await response.json();
        const data: User = res.data;

        setUser(data);

        const buffer = Buffer.from(data.profilePic.data);
        const base64Image = `data:image/jpeg;base64,${buffer.toString(
          'base64',
        )}`;
        setImageUri(base64Image);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);
  const onPressTab = () => {
    navigation.navigate('MyAddressScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Profile" />
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfileScreen');
          }}>
          {imageUri ? (
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.profilePic}
            />
          ) : (
            <Image
              source={require('../../assets/image/icons/profile-user.png')}
              style={styles.profilePic}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
        <Text style={styles.userEmail}>
          {user?.email || 'johndoe@example.com'}
        </Text>
      </View>

      {/* Profile Sections */}
      <View style={styles.section}>
        {[
          {
            title: 'My Address',
            img: require('../../assets/image/icons/pin.png'),
          },
          {
            title: 'Pyment',
            img: require('../../assets/image/icons/credit-card.png'),
          },
          {
            title: 'Help & Supports',
            img: require('../../assets/image/icons/customer-support.png'),
          },
          {
            title: 'Settings',
            img: require('../../assets/image/icons/settingIcon.png'),
          },
        ].map(item => (
          <TouchableOpacity
            key={item.title}
            style={styles.sectionItem}
            onPress={onPressTab}>
            <Image source={item.img} style={styles.imgStyle} />
            <Text style={styles.sectionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require('../../assets/image/icons/logout.png')}
            style={[styles.logoutStyle]}
          />
          <Text style={[styles.sectionText, {color: '#FF4C4C'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionItem: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E0E0E0',
    marginLeft: 20,
  },
  imgStyle: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  logoutStyle: {
    width: 25,
    height: 25,
  },
});
