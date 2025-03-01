import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("fetchJobs", async (params) => {
  const response = await fetch(
    `https://remotive.com/api/remote-jobs?limit=100`
  );
  const finalResult = await response.json();
  return finalResult.jobs;
});

const initialState = {
  allJobPosts: [],
  allJobsLoading: false,
  error: null,
};

const jobPostsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.allJobsLoading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.allJobsLoading = false;
      state.allJobPosts = action.payload;
    });

    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.allJobsLoading = false;
      state.error = action.error.message;
    });
  },
});

export default jobPostsSlice.reducer;
