import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINTS} from '../api/endpoints';

interface userResponse {
  data: any;

  user_id: string;
  email: string;
  type: string;
  profilePic: {
    data: any[];
  };

  userData: any[];
}
interface UpdateProfilePayload {
  email?: string;
  phoneNumber?: string;
  gender?: string;
  profilePicUri?: any; // optional local image uri
}
interface initialStateType {
  loading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  userData: any[];
  updateProfile: any;
}
export const getUserData = createAsyncThunk<
  userResponse,
  {rejectValue: string}
>('auth/login', async (data, {rejectWithValue}) => {
  console.log('data==', data);
  try {
    const response = await apiClient.get<userResponse>(ENDPOINTS.getUser);
    // Store user data in AsyncStorage if needed
    console.log('userData response==', response.data);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data));
    return response;
  } catch (error: any) {
    console.log('====== getUser error --->', error?.response);
    return rejectWithValue(error.response?.data?.message || 'getUser failed');
  }
});

export const updateUserProfile = createAsyncThunk<
  any,
  UpdateProfilePayload,
  {rejectValue: string}
>('profile/update', async (data, {rejectWithValue}) => {
  try {
    const formData = new FormData();

    if (data.email) formData.append('email', data.email);
    if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber);
    if (data.gender) formData.append('gender', data.gender);

    if (data.profilePicUri) {
      const filename = data.profilePicUri.split('/').pop()!;
      const fileType = filename.split('.').pop();

      formData.append('profilePic', {
        uri: data.profilePicUri,
        name: filename,
        type: `image/${fileType}`,
      } as any); // cast to any to satisfy RN FormData type
    }

    const response = await apiClient.put('/updateProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error: any) {
    console.log('Update profile error:', error.response?.data || error);
    return rejectWithValue(error.response?.data?.message || 'Update failed');
  }
});

const initialState: initialStateType = {
  loading: false,
  status: 'idle',
  error: null,
  userData: [],
  updateProfile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: state => {
      state.userData = [];
    },
    resetProfileUpdate: state => {
      console.log('resetProfileUpdate called', state.updateProfile);
      state.updateProfile = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<userResponse>) => {
          state.status = 'succeeded';
          state.userData = action.payload.data;
        },
      )
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching user data:', action.payload);
      })
      .addCase(updateUserProfile.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updateProfile = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      });
  },
});

export const {resetProfile, resetProfileUpdate} = profileSlice.actions;

export default profileSlice.reducer;
