import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import merchantSportSlice from '../features/merchantSport/merchnatSportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    merchantSport: merchantSportSlice,
  },
});

export default store;
