import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSport: null,
};

const merchantSportSlice = createSlice({
  name: 'merchantSport',
  initialState,
  reducers: {
    setSelectedSport: (state, action) => {
      state.selectedSport = action.payload;
    },
  },
});

export const { setSelectedSport } = merchantSportSlice.actions;
export default merchantSportSlice.reducer;
