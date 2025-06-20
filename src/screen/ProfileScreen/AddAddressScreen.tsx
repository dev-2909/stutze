import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Region} from 'react-native-maps';
import HeaderComponent from '../../components/HeaderComponent'; // Your custom header
import {commonStyle} from '../../utils/common/style'; // Common safeArea etc.

const AddAddressScreen: React.FC = () => {
  const [label, setLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [location, setLocation] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -112.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  console.log('---', region);
  // Request current location
  const requestLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('====la', latitude, longitude);

        setRegion(prev => ({
          ...prev,
          latitude,
          longitude,
        }));
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const handleSave = () => {
    console.log('Saved Address:', {
      region,
      location,
      flatNo,
      landmark,
      label,
    });
  };

  return (
    <SafeAreaView style={commonStyle.safeArea}>
      <HeaderComponent title="Add Address" />
      <View style={styles.container}>
        <Text style={styles.title}>Add New Address</Text>

        {/* 🗺️ MapView */}
        <MapView
          provider={Platform.OS === 'ios' ? undefined : 'google'}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>

        <TextInput
          style={styles.input}
          placeholder="Search area, street name..."
          placeholderTextColor="#AAAAAA"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Flat, House No., Building"
          placeholderTextColor="#AAAAAA"
          value={flatNo}
          onChangeText={setFlatNo}
        />

        <TextInput
          style={styles.input}
          placeholder="Landmark (optional)"
          placeholderTextColor="#AAAAAA"
          value={landmark}
          onChangeText={setLandmark}
        />

        <Text style={styles.sectionLabel}>Save As</Text>
        <View style={styles.labelRow}>
          {(['Home', 'Work', 'Other'] as const).map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.labelButton,
                label === item && styles.labelSelected,
              ]}
              onPress={() => setLabel(item)}>
              <Text
                style={[
                  styles.labelText,
                  label === item && styles.labelSelectedText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  labelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
  },
  labelSelected: {
    backgroundColor: '#FF4C4C',
    borderColor: '#FF4C4C',
  },
  labelText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  labelSelectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
