import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

// Define RootState and AppDispatch for TypeScript support in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
