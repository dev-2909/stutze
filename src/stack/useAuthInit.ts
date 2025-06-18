import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './AppStack';

export default function useAuthInit() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('LoginScreen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [token, otpVerified] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('otpVerified'),
        ]);

        if (token && otpVerified === 'true') {
          setInitialRoute('AppTabNavigator');
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { initialRoute, loading };
}
