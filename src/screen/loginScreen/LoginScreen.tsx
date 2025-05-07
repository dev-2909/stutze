import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet, Alert, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../stack/AppStack';
import CustomBtn from '../../components/CustomBtn';
import { showToast } from '../../utils/toast';

type LoginNav = NativeStackNavigationProp<RootStackParamList, 'OTPScreen'>;

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<LoginNav>();
    const { token, status, error } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState('raj.com');
    const [mobile, setMobile] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>('');

    const scheme = useColorScheme(); // Detect the current theme (light/dark)

    console.log('status----------', status);

    useEffect(() => {
        if (status === 'succeeded') {
            navigation.navigate('OTPScreen');
            showToast("OTP send successfully.", "", "success")
        }
    }, [status, token]);
    useEffect(() => {
        if (error && status === "failed") {
            showToast(error, "", "danger");
        }
    }, [status, error])
    const handleLogin = async () => {
        if (!email) {
            showToast('Please enter your email', "", "danger");
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
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const isDarkMode = true; // Check if the current theme is dark

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/image/wp.webp')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={[styles.formContainer, isDarkMode && styles.darkFormContainer]}>
                <Text style={[styles.label, isDarkMode && styles.darkText]}>Login or Sign Up</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, isDarkMode && styles.darkInput]}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <CustomBtn onPress={handleLogin} title='Login' loading={loading} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    darkContainer: { backgroundColor: '#121212' },
    imageContainer: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: '100%' },
    formContainer: { flex: 0.5, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    darkFormContainer: { backgroundColor: '#333' },
    label: { fontSize: 18, marginBottom: 10, textAlign: 'center', color: '#000' },
    darkText: { color: '#fff' },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: { flex: 1, fontSize: 16, height: 50, color: '#000' },
    darkInput: { color: '#fff', backgroundColor: '#444' },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    darkButton: { backgroundColor: '#6200EE' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default LoginScreen;
