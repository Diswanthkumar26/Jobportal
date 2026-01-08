// src/services/profileApi.js
import api from "./api";

// GET current logged-in jobseeker profile
export const getJobSeekerProfile = () => {
  return api.get("/profile/job-seeker/me");
};

// UPDATE jobseeker profile
export const updateJobSeekerProfile = (data) => {
  return api.put("/profile/job-seeker", data);
};

// UPDATE resume only (JSON)
export const updateJobSeekerResume = (data) => {
  return api.put("/profile/job-seeker/resume", data);
};

// UPLOAD resume file (multipart) -> /api/jobseeker/resume
export const uploadResumeFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/jobseeker/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
