import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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
        <View>
            {token ? (
                <View>
                    <Text>Logged in as: {token}</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            ) : (
                <View>
                    <TextInput placeholder="Mobile" onChangeText={setMobile} value={mobile} />
                    <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
                    <Button title="Login" onPress={handleLogin} />
                    {status === 'loading' && <Text>Loading...</Text>}
                    {error && <Text style={{ color: 'red' }}>{error}</Text>}
                </View>
            )}
        </View>
    );
};

export default LoginScreen;
