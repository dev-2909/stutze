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
import {commonStyle} from '../../utils/common/style';
import {Base_Url} from '../../redux/api/endpoints';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getCategory, getUserData} from '../../redux/slices/profileSlice';
import useCommanFn from './MainCommanFn';

type ProfileNav = NativeStackNavigationProp<RootStackParamList>;

const HomeView = () => {
  const navigation = useNavigation<ProfileNav>();
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {getUserDataFn, convertImageToBase64} = useCommanFn();
  // const dispatch = useDispatch();
  const {getCategoryData} = useSelector((state: any) => state.profile);
  const [userDataAll, setUserData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const getData = await getUserDataFn();
      setUserData(getData);
      const imgUrl: any = await convertImageToBase64(getData?.profilePic?.data);
      setImageUri(imgUrl);
    })();
  }, []);

  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(getCategoryData);
  const handleSearch = (text: string) => {
    setSearch(text);
    console.log('text==', text);
    if (text.trim() === '') {
      setFilteredCategories(getCategoryData);
    } else {
      const filtered = getCategoryData.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }
  };
  const getCategoryApi = async () => {
    dispatch(getCategory({rejectValue: 'Error fetching getCategoryData'}));
  };
  const apiCall = async () => {
    try {
      await dispatch(getUserData({rejectValue: 'Error fetching user data'}));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getCategoryApi();
    if (!userDataAll) apiCall();
  }, [userDataAll]);

  return (
    <SafeAreaView style={commonStyle.safeArea}>
      <View style={styles.container}>
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
          data={search?.length > 0 ? filteredCategories : getCategoryData || []}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.flatList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('ServiceScreen', {category: item})
              }>
              <Image source={{uri: item.image}} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
              <Text
                style={[
                  styles.categoryText,
                  {
                    fontSize: 10,
                  },
                ]}>
                ({item.description})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
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
