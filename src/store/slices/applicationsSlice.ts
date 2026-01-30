import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// 1. Status turlarini belgilaymiz
export type ApplicationStatus = "Yangi" | "Ko'rilmoqda" | "Suhbat" | "Rad etildi";

// 2. Ariza interfeysini to'liq yangilaymiz
export interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeBase64: string; // PDF/DOCX uchun Base64 formati ✅
  status: ApplicationStatus; // Arizaning holati 🚩
  appliedAt: string;
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
    // Yangi ariza qo'shish (Boshlang'ich status "Yangi" bo'ladi)
    addApplication: (state, action: PayloadAction<Omit<Application, "status">>) => {
      const newApp: Application = {
        ...action.payload,
        status: "Yangi", // Har doim yangi ariza shu statusda keladi
      };
      state.items.push(newApp);
    },

    // Statusni yangilash funksiyasi 🔄
    updateStatus: (state, action: PayloadAction<{ id: string; status: ApplicationStatus }>) => {
      const app = state.items.find((a) => a.id === action.payload.id);
      if (app) {
        app.status = action.payload.status;
      }
    },

    // Arizani o'chirish (ixtiyoriy, lekin kerak bo'ladi)
    deleteApplication: (state, action: PayloadAction<string>) => {
  // Berilgan ID ga teng bo'lmagan arizalarni saqlab qolamiz
  state.items = state.items.filter((app) => app.id !== action.payload);
  toast.info("Ariza tizimdan o'chirildi"); // Ixtiyoriy: o'chganini bildirish
},
  },
});

export const { addApplication, updateStatus, deleteApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;