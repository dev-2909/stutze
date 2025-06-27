import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import {useSelector} from 'react-redux';
const useCommanFn = () => {
  const {userData} = useSelector((state: any) => state.profile);
  const getUserDataFn = async () => {
    const userDataAsync: any = await AsyncStorage.getItem('userData');
    return userData;
  };
  const convertImageToBase64 = async () => {
    const userDataAll = await getUserDataFn();
    const imgData: any = userDataAll?.profilePic?.data;

    const buffer = Buffer.from(imgData);
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    return base64Image;
  };
  return {
    getUserDataFn,
    convertImageToBase64,
  };
};

export default useCommanFn;
