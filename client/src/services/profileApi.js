// src/api/profileApi.js
import api from "./api";

export const getJobSeekerProfile = () => {
  return api.get("/profile/job-seeker");
};

export const updateJobSeekerProfile = (data) => {
  return api.put("/profile/job-seeker", data);
};
