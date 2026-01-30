import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Standart localStorage
import jobsReducer from "./slices/jobsSlice";
import applicationsReducer from "./slices/applicationsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// 1. Reducerlarni birlashtiramiz
const rootReducer = combineReducers({
  jobs: jobsReducer,
  applications: applicationsReducer,
});

// 2. Persist sozlamalari
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["jobs", "applications"], // Faqat shu slicelar saqlanadi
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Store yaratish
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist action-larini tekshiruvdan o'tkazib yuboramiz
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Turlarni (Types) eksport qilish
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;