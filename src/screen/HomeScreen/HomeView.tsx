import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import {RootStackParamList} from '../../stack/AppStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type ProfileNav = NativeStackNavigationProp<RootStackParamList>;

const HomeView = () => {
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation<ProfileNav>();

  const categories = [
    {id: '1', name: 'Food', image: 'https://via.placeholder.com/80'},
    {id: '2', name: 'Grocery', image: 'https://via.placeholder.com/80'},
    {id: '3', name: 'Pharmacy', image: 'https://via.placeholder.com/80'},
    {id: '4', name: 'Electronics', image: 'https://via.placeholder.com/80'},
    {id: '1', name: 'Food', image: 'https://via.placeholder.com/80'},
    {id: '2', name: 'Grocery', image: 'https://via.placeholder.com/80'},
    {id: '3', name: 'Pharmacy', image: 'https://via.placeholder.com/80'},
    {id: '4', name: 'Electronics', image: 'https://via.placeholder.com/80'},
  ];

  const services = [
    {
      id: '1',
      name: "Domino's Pizza",
      image: 'https://via.placeholder.com/300x150',
      rating: 4.5,
      price: '$$',
    },
    {
      id: '2',
      name: 'KFC',
      image: 'https://via.placeholder.com/300x150',
      rating: 4.2,
      price: '$$',
    },
    {
      id: '3',
      name: 'Burger King',
      image: 'https://via.placeholder.com/300x150',
      rating: 4.0,
      price: '$',
    },
  ];
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }
  };
  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) return console.log('Token not found');

        const response = await fetch('http://10.0.2.2:5000/api/getUser', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const res = await response.json();
        const data = res.data;

        const buffer = Buffer.from(data.profilePic.data);
        const base64Image = `data:image/jpeg;base64,${buffer.toString(
          'base64',
        )}`;
        setImageUri(base64Image);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        setLoading(false);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.locationText}>Near stress, New York, Ny</Text>
        </View>
        {imageUri ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image source={{uri: imageUri}} style={styles.profilePic} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}
            style={{}}>
            <Image
              source={require('../../assets/image/user.png')}
              style={styles.profilePic}
              tintColor={'#fff'}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Search Bar */}
      <SearchBar search={search} handleSearch={handleSearch} />
      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.flatList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate('ServiceScreen', {category: item.name})
            }>
            <Image source={{uri: item.image}} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
  },

  flatList: {
    marginBottom: 20,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E0E0E0',
  },
  serviceCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1F1F1F',
    elevation: 2,
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceInfo: {
    padding: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceMeta: {
    color: '#AAAAAA',
    marginTop: 5,
  },
});
