import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../api/endpoints';

// Define Types
interface AuthState {
    token: string | null;
    mobile: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface LoginPayload {
    mobile: string;
    password: string;
}

interface LoginResponse {
    token: string;
    mobile: string;
}

// Async Thunk: Login
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, credentials);
            const { token, mobile } = response.data;

            // Store token in AsyncStorage
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('mobile', mobile);

            return { token, mobile };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Async Thunk: Logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('mobile');
    return null;
});

const initialState: AuthState = {
    token: null,
    mobile: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle login
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
                state.error = action.payload || 'Unknown error';
            })

            // Handle logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.mobile = null;
                state.status = 'idle';
                state.error = null;
            });
    }
});

export default authSlice.reducer;
