import { createSlice } from "@reduxjs/toolkit";

export const Authentication = createSlice({
  name: "UserSlice",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData, setUserToken } = Authentication.actions;

export default Authentication.reducer;
