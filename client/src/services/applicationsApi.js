// // src/services/applicationsApi.js
// import api from "./api";

// // GET /api/applications/{userId}
// export const getMyApplications = () => {
//   const userId = localStorage.getItem("userId");
//   if (!userId) {
//     return Promise.reject(new Error("No userId in localStorage"));
//   }
//   return api.get(`/applications/${userId}`);
// };

// // POST /api/applications/{userId}/apply/{jobId}
// export const applyToJob = (jobId) => {
//   const userId = localStorage.getItem("userId");
//   if (!userId) {
//     return Promise.reject(new Error("No userId in localStorage"));
//   }
//   return api.post(`/applications/${userId}/apply/${jobId}`);
// };
// src/services/applicationsApi.js
// src/services/applicationsApi.js
import api from "./api";

export const getApplicationStatus = (jobId) =>
  api.get(`/applications/${jobId}/applied`);

export const applyToJob = (jobId) =>
  api.post(`/applications/${jobId}`);

// NEW:
export const getMyApplications = () =>
  api.get("/applications/me");


