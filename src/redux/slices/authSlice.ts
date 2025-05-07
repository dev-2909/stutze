import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../api/endpoints';

// ------------- Define Types -------------
interface AuthState {
  token: string | null;
  mobile: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  otpData: VerifyOtpResponse | null;
}

interface LoginPayload {
  mobile?: string;
  email: string;
  type: string;
}

interface VerifyOtpPayload {
  otp: string;
}

interface LoginResponse {
  token: string;
  mobile: string;
}

interface User {
    user_id: string;
    email: string;
    type: string;
  }
  
  interface VerifyOtpResponse {
    success: boolean;
    message: string;
    user: User;
  }
  

// ------------- Async Thunk: Login -------------
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, data);
      console.log('Login response ===', response);
      const { token } = response;

      // Store token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      return response;
    } catch (error: any) {
      console.log('====== login error --->', JSON.stringify(error?.response, null, 2));
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// ------------- Async Thunk: Verify OTP -------------
export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('Token not found');
      }

      const response = await apiClient.post<VerifyOtpResponse>(
        ENDPOINTS.VERIFY_OTP,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('OTP verification response ===', response);
      return response;
    } catch (error: any) {
      console.log('OTP verification error:', JSON.stringify(error.response?.data?.message, null, 2));
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

// ------------- Async Thunk: Logout -------------
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('mobile');
  return null;
});

// ------------- Initial State -------------
const initialState: AuthState = {
  token: null,
  mobile: null,
  status: 'idle',
  error: null,
  otpData: null,
};

// ------------- Slice -------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.mobile = action.payload.mobile;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })

      // Verify OTP cases
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.status = 'succeeded';
        state.otpData = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'OTP verification failed';
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.mobile = null;
        state.status = 'idle';
        state.error = null;
        state.otpData = null;
      });
  }
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
