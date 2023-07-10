import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import adminSlice from "./slice/adminSlice";
import contactSlice from "./slice/contactSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    contact: contactSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
