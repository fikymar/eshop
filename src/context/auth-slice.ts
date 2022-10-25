import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// export const { login, logout } = authSlice.actions;

// export const logState = (state: RootState) => state.auth.isLoggedIn;
export const authActions = authSlice.actions;

export default authSlice;
