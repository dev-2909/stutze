import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stack/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface User {
    name: string;
    email: string;
    profilePic: {
        data: number[];
    };
}
type ProfileNav = NativeStackNavigationProp<RootStackParamList>;
const ProfileView = () => {
    const [user, setUser] = useState<User | null>(null);
    const [imageUri, setImageUri] = useState<string>('');
    console.log('user', user);
    const navigation = useNavigation<ProfileNav>();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) return;

                const response = await fetch('http://10.0.2.2:5000/api/getUser', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const res = await response.json();
                const data: User = res.data;

                setUser(data);

                const buffer = Buffer.from(data.profilePic.data);
                const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
                setImageUri(base64Image);
            } catch (error) {
                console.log('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EditProfileScreen")
                }}>
                    <Image
                        source={{
                            uri: imageUri || 'https://via.placeholder.com/100',
                        }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>

                <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'johndoe@example.com'}</Text>
            </View>

            {/* Profile Sections */}
            <View style={styles.section}>
                {['My Orders', 'Favorites', 'Payments', 'Settings'].map((item) => (
                    <TouchableOpacity key={item} style={styles.sectionItem}>
                        <Text style={styles.sectionText}>{item}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.sectionItem}>
                    <Text style={[styles.sectionText, { color: '#FF4C4C' }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ProfileView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#1E1E1E',
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userEmail: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionItem: {
        backgroundColor: '#1F1F1F',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 1,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#E0E0E0',
    },
});
