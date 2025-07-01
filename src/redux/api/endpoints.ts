export const Base_Url = 'http://localhost:5001/api';

export const ENDPOINTS = {
  LOGIN: '/auth',
  VERIFY_OTP: '/verifyOtp',
  getUser: '/getUser',
  getCategory: '/categories',
  getService: '/services/:categoryId',
  addAddress: '/address',
  getAddress: '/getAddress',
  editDeleteAddress: '/deleteOrEditAddress',
};
