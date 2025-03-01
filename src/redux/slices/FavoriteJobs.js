import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteJobs: [],
};

const favJobsSlice = createSlice({
  name: "allFavJobs",
  initialState,
  reducers: {
    setFavoriteJobs: (state, action) => {
      state.favoriteJobs = action.payload;
    },
  },
});
export const { setFavoriteJobs } = favJobsSlice.actions;

export default favJobsSlice.reducer;
