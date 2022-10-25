import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  open: false,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    openProfile(state) {
      state.open = true;
    },
    closeProfile(state) {
      state.open = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
