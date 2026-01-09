// client/src/services/applicationsApi.js
import api from "./api";

export const getApplicationStatus = (jobId) =>
  api.get(`/applications/${jobId}/applied`);

export const applyToJob = (jobId) =>
  api.post(`/applications/${jobId}`);

export const getMyApplications = () =>
  api.get("/applications/me");

export const getApplicantsForJob = (jobId) =>
  api.get(`/employer/jobs/${jobId}/applications`);

export const updateApplicationStatus = (applicationId, status) =>
  api.patch(`/employer/applications/${applicationId}/status`, null, {
    params: { status },
  });
