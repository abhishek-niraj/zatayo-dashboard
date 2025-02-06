import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFitness: null,
};

const merchantFitnessSlice = createSlice({
  name: 'merchantFitness',
  initialState,
  reducers: {
    setSelectedFitness: (state, action) => {
      state.selectedFitness = action.payload;
    },
  },
});

export const { setSelectedFitness } = merchantFitnessSlice.actions;
export default merchantFitnessSlice.reducer;
