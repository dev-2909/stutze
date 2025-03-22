import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, status, error } = useSelector((state: RootState) => state.auth);
    
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        dispatch(loginUser({ mobile, password }));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
            <View style={styles.container}>
              {/* Top Half - Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/image/wp.webp')} // Replace with your actual image URL
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.label}>Login in or sign up</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.prefix}>+91</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter mobile number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={mobile}
                    onChangeText={setMobile}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                {/* <View>
                    <Text>Or</Text>
                </View> */}
              </View>
            </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1 },
    imageContainer: { flex: 0.5, justifyContent: "center", alignItems: "center" },
    image: { width: "100%", height: "100%" },
    formContainer: { flex: 0.5, padding: 20, alignItems: "center" },
    label: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    prefix: { fontSize: 16, marginRight: 10 },
    input: { flex: 1, fontSize: 16, height: 50 },
    button: {
      backgroundColor: "#007BFF",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      width:'100%'
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  });
export default LoginScreen;
