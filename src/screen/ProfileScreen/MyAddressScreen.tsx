import React, {useState} from 'react';
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

const MyAddressScreen = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      title: 'Home',
      address: '123 Main Street, New York, NY',
      icon: require('../../assets/image/icons/homeIcon.png'),
    },
    {
      id: '2',
      title: 'Work',
      address: '456 Office Park, Brooklyn, NY',
      icon: require('../../assets/image/icons/homeIcon.png'),
    },
    {
      id: '3',
      title: 'Other',
      address: '789 Random Place, Queens, NY',
      icon: require('../../assets/image/icons/pin.png'),
    },
  ]);

  const handleAddAddress = () => {
    // Navigate to Add Address Screen or show a modal
    console.log('Add Address');
  };

  const handleEditAddress = (id: string) => {
    // Navigate to Edit Address Screen or show a modal
    console.log('Edit Address:', id);
  };

  const handleDeleteAddress = (id: string) => {
    // Delete the address from the list
    setAddresses(prev => prev.filter(address => address.id !== id));
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
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.addressCard}>
              <Image source={item.icon} style={styles.icon} />
              <View style={styles.addressInfo}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressText}>{item.address}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(item.id)}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(item.id)}>
                  <Text style={[styles.actionText, {color: '#FF4C4C'}]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
