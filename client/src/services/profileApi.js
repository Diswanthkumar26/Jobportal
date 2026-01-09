// client/src/services/profileApi.js
import api from "./api";

export const getJobSeekerProfile = () =>
  api.get("/profile/job-seeker/me");

export const updateJobSeekerProfile = (data) =>
  api.put("/profile/job-seeker", data);

export const updateJobSeekerResume = (data) =>
  api.put("/profile/job-seeker/resume", data);

export const uploadResumeFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/jobseeker/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteJobSeekerResume = () =>
  api.delete("/profile/job-seeker/resume");