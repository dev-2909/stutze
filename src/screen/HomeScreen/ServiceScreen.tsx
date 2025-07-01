// src/screens/ServiceScreen.tsx

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../stack/AppStack';
import SearchBar from '../../components/SearchBar';
import {commonStyle} from '../../utils/common/style';
import HeaderComponent from '../../components/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getService} from '../../redux/slices/profileSlice';

type ServiceRouteProp = RouteProp<RootStackParamList, 'ServiceScreen'>;

const sampleServices = [
  {
    id: '1',
    name: "Domino's Pizza",
    image: 'https://via.placeholder.com/300x150',
    rating: 4.5,
    price: '$$',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://via.placeholder.com/300x150',
    rating: 4.0,
    price: '$',
  },
  {
    id: '3',
    name: 'KFC',
    image: 'https://via.placeholder.com/300x150',
    rating: 4.3,
    price: '$$',
  },
];

const ServiceScreen = () => {
  const route = useRoute<ServiceRouteProp>();
  const {category} = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const {getServiceData} = useSelector((state: any) => state.profile);
  console.log('getServiceData===', getServiceData);
  useEffect(() => {
    const categoryId = category?._id; // Replace with your actual category ID
    dispatch(getService({categoryId}))
      .unwrap()
      .then(response => {
        console.log('Services data:', response);
      })
      .catch(error => {
        console.error('Failed to fetch services:', error);
      });
  }, [dispatch]);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(
    getServiceData || [],
  );
  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === '') {
      setFilteredCategories(getServiceData);
    } else {
      const filtered = getServiceData.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }
  };
  const getCategoryApi = async () => {};
  return (
    <SafeAreaView style={commonStyle.safeArea}>
      <HeaderComponent title={`${category?.name} Services`} />
      <View style={styles.container}>
        {/* Search Bar */}
        <SearchBar search={search} handleSearch={handleSearch} />
        <FlatList
          data={
            filteredCategories.length > 0 ? filteredCategories : getServiceData
          }
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  ⭐ {item.rating} • {item.price}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{paddingBottom: 50, marginTop: 15}}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  meta: {
    color: '#aaa',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ServiceScreen;
