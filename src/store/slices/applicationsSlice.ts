import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type ApplicationStatus = "Yangi" | "Ko'rilmoqda" | "Suhbat" | "Rad etildi";

export interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeBase64: string;
  status: ApplicationStatus;
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
    addApplication: (state, action: PayloadAction<Omit<Application, "status">>) => {
      const newApp: Application = {
        ...action.payload,
        status: "Yangi",
      };
      state.items.push(newApp);
    },

    updateStatus: (state, action: PayloadAction<{ id: string; status: ApplicationStatus }>) => {
      const app = state.items.find((a) => a.id === action.payload.id);
      if (app) {
        app.status = action.payload.status;
      }
    },

    deleteApplication: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((app) => app.id !== action.payload);
      toast.info("Ariza tizimdan o'chirildi");
    },
  },
});

export const { addApplication, updateStatus, deleteApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;
