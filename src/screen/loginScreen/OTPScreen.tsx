import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { reset, verifyOtp } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomBtn from '../../components/CustomBtn';
import { showToast } from '../../utils/toast';
import { RootStackParamList } from '../../stack/AppStack';

const CELL_COUNT = 4;

type OTPNav = NativeStackNavigationProp<RootStackParamList, 'OTPScreen'>;

const OTPScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<OTPNav>();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const [errorValid, setError] = useState('');
  const { otpData, status, error } = useSelector((state: RootState) => state.auth);

  const scheme = useColorScheme(); // Detect current theme
  useEffect(() => {
    console.log('===otpData',otpData);
    
    if (otpData?.success) {
      (async () => {
        setValue('');
        navigation.replace('HomeScreen');
        showToast(otpData.message, "", "success");
        // Store OTP verified flag
        await AsyncStorage.setItem('otpVerified', 'true');
        await AsyncStorage.setItem('userId', otpData.user.user_id);
        await AsyncStorage.setItem('email', otpData.user.email);
        await AsyncStorage.setItem('type', otpData.user.type);
        dispatch(reset()); // Reset the auth state
      })();
    }
  }, [otpData]);
  useEffect(() => {
    if (error && status === "failed") {
      showToast(error, "", "danger");
    }
  }, [status, error])

  const handleVerify = async () => {
    reset();
    if (value.length < 4) {
      showToast('Please enter full OTP', "", "danger");
      return;
    }
    await dispatch(verifyOtp({ otp: value }));
  };

  const isDarkMode = true; // Check if dark mode is enabled

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Enter OTP</Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(text) => {
          reset();
          setValue(text);
          setError('');
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell, isDarkMode && styles.darkCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={[styles.cellText, isDarkMode && styles.darkCellText]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <CustomBtn onPress={handleVerify} title='Verify OTP' />
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkCell: {
    borderColor: '#fff',
  },
  cellText: {
    fontSize: 24,
    color: '#000',
  },
  darkCellText: {
    color: '#fff',
  },
  focusCell: {
    borderColor: '#007AFF',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  darkError: {
    color: '#FF6347', // Light red for dark mode
  },
});
