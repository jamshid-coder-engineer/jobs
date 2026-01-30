import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Ariza uchun ma'lumotlar tuzilishi
interface Application {
  id: string;
  jobId: string;      // Qaysi vakansiyaga topshirilgani 🆔
  fullName: string;
  email: string;
  phone: string;
  resumeLink: string;
  appliedAt: string;  // Topshirilgan vaqti 📅
}

interface ApplicationsState {
  items: Application[];
}

const initialState: ApplicationsState = {
  items: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    // Yangi ariza qo'shish funksiyasi 📥
    addApplication: (state, action: PayloadAction<Application>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;