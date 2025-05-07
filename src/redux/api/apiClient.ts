import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const api = axios.create({
    baseURL: 'http://10.0.2.2:5000/api',
    timeout: 10000,
  });
  
  // ✅ Fix: use InternalAxiosRequestConfig for the interceptor
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        // console.log('📤 Request:', config.baseURL + config.url, config.data);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    error => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized - maybe redirect to login');
      }
      return Promise.reject(error);
    }
  );
  
  // Methods
  const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  };
  
  const post = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<T>(url, data, config);
    return response.data;
  };
  
  const put = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    console.log('=====data',url,data,config);
    
    const response = await api.put<T>(url, data, config);
    return response.data;
  };
  
  export default {
    get,
    post,
    put,
  };
  