import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jobsReducer from "./slices/jobsSlice";
import applicationsReducer from "./slices/applicationsSlice";
import authReducer from "./slices/authSlice";

// 1. Reducerlarni birlashtiramiz
const rootReducer = combineReducers({
  jobs: jobsReducer,
  applications: applicationsReducer,
  auth: authReducer,
});

// 2. Persist sozlamalari
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "applications"], // Faqat shu qismlar saqlanadi
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Store yaratish
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist xatolarini oldini oladi
    }),
});

export const persistor = persistStore(store);

// --- MUHIM QISM: TypeScript turlari ---
// RootState-ni persistedReducer-dan emas, rootReducer-dan olamiz!
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Custom hooklar
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;