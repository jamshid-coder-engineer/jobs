import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Vakansiya uchun interfeys
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  responsibilities: string[];
  requirements: string[];
}

interface JobsState {
  items: Job[];
}

// Boshlang'ich holat
const initialState: JobsState = {
  items: [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Toshkent",
      salary: "$1200 - $1800",
      type: "Full-time",
      responsibilities: ["REST API integratsiyasi", "UI yaratish"],
      requirements: ["2 yillik tajriba", "React bilimi"]
    }
  ],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Yangi vakansiya qo'shish funksiyasi ➕
    addJob: (state, action: PayloadAction<Job>) => {
      state.items.push(action.payload);
    },
    // Vakansiyani o'chirish (ixtiyoriy) 🗑️
    deleteJob: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(job => job.id !== action.payload);
    }
  },
});

export const { addJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;