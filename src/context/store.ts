import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth-slice";

import userSlice from "./user-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userData: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
