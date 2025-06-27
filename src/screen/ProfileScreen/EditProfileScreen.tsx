import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {commonStyle} from '../../utils/common/style';
import HeaderComponent from '../../components/HeaderComponent';
import useCommanFn from '../HomeScreen/MainCommanFn';
import {AppDispatch} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetProfile,
  resetProfileUpdate,
  updateUserProfile,
} from '../../redux/slices/profileSlice';
import CustomBtn from '../../components/CustomBtn';
import {showToast} from '../../utils/toast';

const EditProfileScreen = () => {
  const darkMode = true;
  const {convertImageToBase64} = useCommanFn();
  const dispatch = useDispatch<AppDispatch>();

  const {updateProfile, loading, userData} = useSelector(
    (state: any) => state.profile,
  );
  console.log('updateProfile', userData);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState(userData?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(
    userData?.gender || '',
  );

  useEffect(() => {
    if (updateProfile?.success) {
      dispatch(resetProfileUpdate());
      showToast('Profile updated successfully.', '', 'success');
    }
  }, [updateProfile]);
  useEffect(() => {
    (async () => {
      const imgUrlData: any = await convertImageToBase64();
      setProfilePic(imgUrlData);
    })();
  }, []);
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0]?.uri) {
        setProfilePic(response.assets[0].uri);
      }
    });
  };
  const handleUpdateProfile = () => {
    dispatch(
      updateUserProfile({
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        profilePicUri: profilePic,
      }),
    );
  };

  return (
    <SafeAreaView style={commonStyle.safeArea}>
      <HeaderComponent title="Edit Profile" />
      <ScrollView
        style={[styles.container, darkMode && styles.containerDark]}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profilePic
                ? {uri: profilePic}
                : require('../../assets/image/wp.webp')
            }
            style={styles.profileImage}
          />
          <Text style={[styles.changePicText, darkMode && styles.textDark]}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          value={name}
          placeholder="Name"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          value={phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          value={email}
          placeholder="Email"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          value={gender}
          placeholder="Gender"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          onChangeText={text => setGender(text as any)}
        />
        <CustomBtn
          onPress={handleUpdateProfile}
          title="Save"
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#888',
  },
  changePicText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  textDark: {
    color: '#eee',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  inputDark: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#222',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
