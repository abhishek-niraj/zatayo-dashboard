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
    updateImageStatus: (state, action) => {
      // if (!state.selectedFitness) return;

      const { imagesSportId, newStatus } = action.payload;
      const image = state.selectedSport.images.find(
        (img) => img.imagesSportId === imagesSportId
      );

      if (image) {
        image.imageStatus = newStatus;
      }
    },
  },
});

export const { setSelectedSport, updateImageStatus } =
  merchantSportSlice.actions;
export default merchantSportSlice.reducer;
