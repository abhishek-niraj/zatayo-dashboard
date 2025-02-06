import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import merchantSportSlice from '../features/merchantSport/merchnatSportSlice';
import merchantFitnessSlice from '../features/merchantSport/merchantFitness';
const store = configureStore({
  reducer: {
    auth: authReducer,
    merchantSport: merchantSportSlice,
    merchantFitness: merchantFitnessSlice,
  },
});

export default store;
