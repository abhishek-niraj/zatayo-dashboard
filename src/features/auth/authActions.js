import axios from 'axios';
import authTypes from './authTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Action: Login User using createAsyncThunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, user);
      if (response.data.statusCode === 200) {
        localStorage.setItem('zatayoAppToken', response.data.token);

        return response.data; // Return user data and token
      } else {
        return rejectWithValue(response.data.message); // Reject with error message
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);
// Action: Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: authTypes.LOGOUT });
};
