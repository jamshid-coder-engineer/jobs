import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage-dan foydalanish
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
  whitelist: ["auth", "applications"], // Faqat auth va arizalarni saqlab qolamiz
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Store yaratamiz
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist uchun xatolikni oldini oladi
    }),
});

export const persistor = persistStore(store);

// Turlarni eksport qilamiz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;