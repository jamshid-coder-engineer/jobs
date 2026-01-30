import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const jobService = {
  getAll: () => API.get("/jobs"),
  getById: (id: string) => API.get(`/jobs/${id}`),
  create: (data: any) => API.post("/jobs", data),
};

export const applicationService = {
  send: (data: any) => API.post("/applications", data),
  getUserApplications: () => API.get("/applications"),
};
