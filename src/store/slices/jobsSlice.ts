import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/jobs";

// Async Thunks
export const fetchJobs = createAsyncThunk("jobs/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addNewJob = createAsyncThunk("jobs/add", async (newJob: any) => {
  const response = await axios.post(API_URL, newJob);
  return response.data;
});

interface JobsState {
  items: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobsState = {
  items: [],
  status: "idle",
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addNewJob.fulfilled, (state, action: PayloadAction<any>) => {
        state.items.push(action.payload);
      });
  },
});

export default jobsSlice.reducer;