import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("fetchJobs", async (limittt) => {
  const response = await fetch(
    `https://remotive.com/api/remote-jobs?limit=${limittt}`
  );
  const finalResult = await response.json();
  let counttt = finalResult["total-job-count"];
  return {
    jobArray: finalResult.jobs,
    totalCount: counttt,
  };
});

const initialState = {
  allJobPosts: [],
  allJobsLoading: false,
  recordsLimit: 20,
  totalRecords: 0,
  error: null,
};

const jobPostsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    setRecordsLimit: (state, action) => {
      state.recordsLimit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.allJobsLoading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.allJobsLoading = false;
      state.allJobPosts = action.payload.jobArray;
      state.totalRecords = action.payload.totalCount;
    });

    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.allJobsLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setRecordsLimit } = jobPostsSlice.actions;

export default jobPostsSlice.reducer;
