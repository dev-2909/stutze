import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {commonStyle} from '../../utils/common/style';
import HeaderComponent from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../stack/AppStack';
import EditAddressModal from '../../components/EditAddressModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {
  editDeleteAddress,
  getMyAddresses,
  resetgetEditDeleteAddressRes,
} from '../../redux/slices/profileSlice';
import {showToast} from '../../utils/toast';

type MyAddressScreenNAv = NativeStackNavigationProp<RootStackParamList>;

const MyAddressScreen = () => {
  const navigation = useNavigation<MyAddressScreenNAv>();
  const dispatch = useDispatch<AppDispatch>();
  const {getAddressRes, getEditDeleteAddressRes} = useSelector(
    (state: any) => state.profile,
  );
  useEffect(() => {
    if (getAddressRes?.success) {
      setAddresses(getAddressRes.data);
    }
  }, [getAddressRes]);
  const [addresses, setAddresses] = useState<
    [
      {
        id: string;
        title: string;
        address: string;
        city: string;
        zipcode: string;
        street: string;
        _id: string;
        icon?: any; // Assuming icon is an optional property
      },
    ]
  >(getAddressRes);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    id: string;
    title: string;
    address: string;
  } | null>(null);
  const handleAddAddress = () => {
    navigation.navigate('AddAddressScreen');
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchAddresses = async () => {
        try {
          await dispatch(getMyAddresses()).unwrap();
        } catch (error) {
          console.error('Failed to fetch addresses:', error);
        }
      };
      fetchAddresses();
    }, [dispatch]),
  );
  useEffect(() => {
    console.log('getEditDeleteAddressRes===', getEditDeleteAddressRes);
    if (getEditDeleteAddressRes?.success) {
      showToast(getEditDeleteAddressRes?.message, '', 'success');
      dispatch(resetgetEditDeleteAddressRes());
      dispatch(getMyAddresses());
    }
  }, [getEditDeleteAddressRes]);
  const handleEditAddress = (id: string) => {
    // const addressToEdit = addresses.find((address: any) => address._id === id);
    // setSelectedAddress(addressToEdit);
    setEditModalVisible(true);
  };
  const handleSaveEdit = () => {
    if (selectedAddress) {
      // setAddresses(prev =>
      //   prev.map(address =>
      //     address.id === selectedAddress.id
      //       ? {...selectedAddress, icon: address.icon}
      //       : address,
      //   ),
      // );
      setEditModalVisible(false);
      setSelectedAddress(null);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const deleteData: any = {
      type: 'delete',
      addressId: id,
    };

    await dispatch(editDeleteAddress(deleteData));
  };

  return (
    <SafeAreaView style={commonStyle.safeArea}>
      <HeaderComponent title="My Addresses" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.addButtonText}>+ Add Address</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={addresses || []}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.addressCard}>
              {/* <Image source={item.icon} style={styles.icon} /> */}
              <View style={styles.addressInfo}>
                <Text style={styles.addressTitle}>
                  {item.city + '-' + item.zipcode}
                </Text>
                <Text style={styles.addressText}>{item.street}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(item._id)}>
                  <Image
                    source={require('../../assets/image/icons/edit.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(item._id)}>
                  <Image
                    source={require('../../assets/image/icons/delete.png')}
                    style={styles.icon}
                    tintColor={'red'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <EditAddressModal
          isEditModalVisible={isEditModalVisible}
          setEditModalVisible={setEditModalVisible}
          handleSaveEdit={handleSaveEdit}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 15,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addressText: {
    fontSize: 14,
    color: '#BBBBBB',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
