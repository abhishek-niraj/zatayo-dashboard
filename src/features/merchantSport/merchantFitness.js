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

    updateImageStatus: (state, action) => {
      // if (!state.selectedFitness) return;

      const { imagesFitnessId, newStatus } = action.payload;
      const image = state.selectedFitness.images.find(
        (img) => img.imagesFitnessId === imagesFitnessId
      );

      if (image) {
        image.imageStatus = newStatus;
      }
    },
  },
});

export const { setSelectedFitness, updateImageStatus } =
  merchantFitnessSlice.actions;
export default merchantFitnessSlice.reducer;
