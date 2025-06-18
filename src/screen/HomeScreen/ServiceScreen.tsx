// src/screens/ServiceScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../stack/AppStack';
import SearchBar from '../../components/SearchBar';

type ServiceRouteProp = RouteProp<RootStackParamList, 'ServiceScreen'>;

const sampleServices = [
  {
    id: '1',
    name: 'Domino\'s Pizza',
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
  const { category } = route.params;

  const filteredServices = sampleServices.filter(service =>
    service.name.toLowerCase().includes(category.toLowerCase())
  );
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(filteredServices);
  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Services</Text>
      {/* Search Bar */}
        <SearchBar  search={search} handleSearch={handleSearch} />
      <FlatList
        data={filteredServices.length > 0 ? filteredServices : sampleServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
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
        contentContainerStyle={{ paddingBottom: 50,marginTop:15 }}
      />
    </View>
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
