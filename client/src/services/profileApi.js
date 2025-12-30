import api from "./api";

export const getJobSeekerProfile = () => api.get("/profile/job-seeker");

export const updateJobSeekerProfile = (data) =>
  api.put("/profile/job-seeker", data);   
