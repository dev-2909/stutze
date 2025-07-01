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
interface AddressResponse {
  status: string;
  message: string;
  data: any;
}
interface AddressType {
  status: string;
  message: string;
  data: any;
}
interface initialStateType {
  loading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  userData: any[];
  updateProfile: any;
  getCategoryData: any;
  getServiceData: any;
  addAddressRes: any;
  getAddressRes: any;
  getEditDeleteAddressRes: any;
}
interface AddAddressPayload {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}
interface EditDeleteAddressPayload {
  type: 'edit' | 'delete';
  addressId: string;
  // Include these fields only when editing
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  latitude?: number;
  longitude?: number;
}

interface EditDeleteAddressResponse {
  success: boolean;
  message: string;
  data?: any;
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
export const getCategory = createAsyncThunk<
  userResponse,
  {rejectValue: string}
>('profile/getCategory', async (data, {rejectWithValue}) => {
  try {
    const response = await apiClient.get<userResponse>(ENDPOINTS.getCategory);
    // Store user data in AsyncStorage if needed
    console.log('getCategory response==', response);
    return response;
  } catch (error: any) {
    console.log('====== getUser error --->', error?.response);
    return rejectWithValue(error.response?.data?.message || 'getUser failed');
  }
});
export const getService = createAsyncThunk<
  userResponse,
  {categoryId: string}, // payload with categoryId
  {rejectValue: string}
>('profile/getService', async ({categoryId}, {rejectWithValue}) => {
  try {
    const endpoint = ENDPOINTS.getService.replace(':categoryId', categoryId);
    const response = await apiClient.get<userResponse>(endpoint);
    console.log('getService response==', response);
    return response;
  } catch (error: any) {
    console.log('====== getService error --->', error?.response);
    return rejectWithValue(
      error.response?.data?.message || 'getService failed',
    );
  }
});
export const addAddress = createAsyncThunk<
  AddressResponse, // returned data type
  AddAddressPayload, // payload type
  {rejectValue: string} // rejection value type
>('profile/addAddress', async (payload, {rejectWithValue}) => {
  try {
    const endpoint = ENDPOINTS.addAddress; // e.g., '/api/address/add'
    const response = await apiClient.post<AddressResponse>(endpoint, payload);
    console.log('addAddress response ==>', response.data);
    return response.data;
  } catch (error: any) {
    console.log('===== addAddress error --->', error?.response);
    return rejectWithValue(
      error.response?.data?.message || 'Add address failed',
    );
  }
});
export const getMyAddresses = createAsyncThunk<
  AddressType, // Return type: array of addresses
  void, // Argument type: none (no payload needed)
  {rejectValue: string} // Rejection type
>('profile/getMyAddresses', async (_, {rejectWithValue}) => {
  try {
    const response = await apiClient.get<AddressResponse>('/getAddress');
    console.log('getMyAddresses response ==>', response);
    return response; // assuming your API returns { success, data: [...] }
  } catch (error: any) {
    console.log('getMyAddresses error --->', error?.response);
    return rejectWithValue(
      error?.response?.data?.message || 'Failed to fetch addresses',
    );
  }
});
export const editDeleteAddress = createAsyncThunk<
  EditDeleteAddressResponse, // returned data type
  EditDeleteAddressPayload, // payload type
  {rejectValue: string} // rejection value type
>('profile/editDeleteAddress', async (payload, {rejectWithValue}) => {
  try {
    const endpoint = ENDPOINTS.editDeleteAddress; // e.g., '/api/address/delete-edit'
    const response = await apiClient.post<EditDeleteAddressResponse>(
      endpoint,
      payload,
    );
    console.log('editDeleteAddress response ==>', response);
    return response;
  } catch (error: any) {
    console.log('===== editDeleteAddress error --->', error?.response);
    return rejectWithValue(
      error.response?.data?.message || 'Edit/Delete address failed',
    );
  }
});
const initialState: initialStateType = {
  loading: false,
  status: 'idle',
  error: null,
  userData: [],
  updateProfile: null,
  getCategoryData: null,
  getServiceData: null,
  addAddressRes: null,
  getAddressRes: null,
  getEditDeleteAddressRes: null,
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
    resetAddress: state => {
      state.addAddressRes = null;
    },
    resetgetAddress: state => {
      state.getAddressRes = null;
    },
    resetgetEditDeleteAddressRes: state => {
      state.getEditDeleteAddressRes = null;
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
      })
      .addCase(getCategory.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getCategoryData = action.payload.data;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      })
      .addCase(getService.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getServiceData = action.payload.data;
        state.loading = false;
      })
      .addCase(getService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      })
      .addCase(addAddress.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addAddressRes = action.payload;
        state.loading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      })
      .addCase(getMyAddresses.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getMyAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getAddressRes = action.payload;
        state.loading = false;
      })
      .addCase(getMyAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      })
      .addCase(editDeleteAddress.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(editDeleteAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getEditDeleteAddressRes = action.payload;
        state.loading = false;
      })
      .addCase(editDeleteAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        console.error('Profile update error:', action.payload);
      });
  },
});

export const {
  resetProfile,
  resetProfileUpdate,
  resetAddress,
  resetgetAddress,
  resetgetEditDeleteAddressRes,
} = profileSlice.actions;

export default profileSlice.reducer;
