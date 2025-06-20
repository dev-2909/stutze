import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logoutUser} from '../../redux/slices/authSlice';
import {RootState, AppDispatch} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../stack/AppStack';
import CustomBtn from '../../components/CustomBtn';
import {showToast} from '../../utils/toast';

type LoginNav = NativeStackNavigationProp<RootStackParamList, 'OTPScreen'>;

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginNav>();
  const {token, status, error} = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('user@example.com');
  const [mobile, setMobile] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState('Customer');
  useEffect(() => {
    if (status === 'succeeded') {
      navigation.replace('OTPScreen');
      showToast('OTP send successfully.', '', 'success');
    }
  }, [status, token]);
  useEffect(() => {
    if (error && status === 'failed') {
      showToast(error, '', 'danger');
    }
  }, [status, error]);
  const handleLogin = async () => {
    navigation.replace('OTPScreen');
    return;
    if (!email) {
      showToast('Please enter your email', '', 'danger');
      return;
    }
    const credentials = {
      email: email.toString(),
      type: '0',
    };

    setLoading(true);

    try {
      await dispatch(loginUser(credentials));
    } catch (error) {
      console.log('-======', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const isDarkMode = true; // Check if the current theme is dark
  const filters = ['Customer', 'Provider'];
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/image/wp.webp')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View
        style={[styles.formContainer, isDarkMode && styles.darkFormContainer]}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Login or Sign Up
        </Text>
        <View style={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter,
              ]}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <CustomBtn onPress={handleLogin} title="Login" loading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  darkContainer: {backgroundColor: '#121212'},
  imageContainer: {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
  image: {width: '100%', height: '100%'},
  formContainer: {
    flex: 0.5,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkFormContainer: {backgroundColor: '#333'},
  label: {fontSize: 18, marginBottom: 10, textAlign: 'center', color: '#000'},
  darkText: {color: '#fff', fontSize: 14, fontWeight: '700'},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {flex: 1, fontSize: 16, height: 50, color: '#000'},
  darkInput: {color: '#fff', backgroundColor: '#444'},
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  darkButton: {backgroundColor: '#6200EE'},
  buttonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 10,
    marginTop: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#222',
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#ccc',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#000',
    fontWeight: '600',
  },
  message: {
    color: '#888',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
});

export default LoginScreen;
