import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer, // jobsSlice'ni bu yerga uladik
  },
});

// TypeScript uchun Store va State turlarini (types) aniqlab olamiz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;