// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChooseRole from "./pages/ChooseRole";

import JobSeekerDetails from "./pages/profile/JobSeekerDetails";
import EmployerDetails from "./pages/profile/EmployerDetails";

import JobSeekerDashboard from "./pages/dashboard/JobSeekerDashboard";
import EmployerDashboard from "./pages/dashboard/EmployerDashboard";

import JobseekerHome from "./pages/home/JobseekerHome";
import EmployerHome from "./pages/home/EmployerHome";
import JobPostPage from "./pages/employer/JobPostPage";
import EmployerJobsPage from "./pages/employer/EmployerJobsPage";
import EmployerCandidatesPage from "./pages/employer/EmployerCandidatesPage";
import EmployerLayout from "./layouts/EmployerLayout";
import EmployerJobApplicantsPage from "./pages/employer/EmployerJobApplicantsPage";
import EmployerJobDetails from "./pages/employer/EmployerJobDetails";

import PrivateRoute from "./routes/PrivateRoute";

import EditFullProfile from "./pages/profile/EditFullProfile";
import FindJobs from "./pages/jobs/FindJobs";   
import JobDetails from "./pages/jobs/JobDetails";

import JobseekerApplications from "./pages/jobseeker/JobseekerApplications";
import SavedJobs from "./pages/jobseeker/SavedJobs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROLE SELECTION */}
        <Route
          path="/choose-role"
          element={
            <PrivateRoute>
              <ChooseRole />
            </PrivateRoute>
          }
        />

        {/* PROFILE DETAILS */}
        <Route
          path="/profile/job-seeker"
          element={
            <PrivateRoute>
              <JobSeekerDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/employer"
          element={
            <PrivateRoute>
              <EmployerDetails />
            </PrivateRoute>
          }
        />

        {/* HOME */}
        <Route
          path="/home/jobseeker"
          element={
            <PrivateRoute>
              <JobseekerHome />
            </PrivateRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard/jobseeker"
          element={
            <PrivateRoute>
              <JobSeekerDashboard />
            </PrivateRoute>
          }
        />

        <Route
  path="/employer"
  element={
    <PrivateRoute>
      <EmployerLayout />
    </PrivateRoute>
  }
>
  <Route
    path="home"
    element={
      <PrivateRoute>
        <EmployerHome />
      </PrivateRoute>
    }
  />
  <Route
    path="jobs"
    element={
      <PrivateRoute>
        <EmployerJobsPage />
      </PrivateRoute>
    }
  />
  <Route
    path="jobs/:id"
    element={
      <PrivateRoute>
        <EmployerJobDetails />
      </PrivateRoute>
    }
  />
  <Route
    path="jobs/:jobId/applicants"
    element={
      <PrivateRoute>
        <EmployerJobApplicantsPage />
      </PrivateRoute>
    }
  />
  <Route
    path="candidates"
    element={
      <PrivateRoute>
        <EmployerCandidatesPage />
      </PrivateRoute>
    }
  />
  {/* create job */}
  <Route
    path="jobs/post"
    element={
      <PrivateRoute>
        <JobPostPage />
      </PrivateRoute>
    }
  />
  {/* NEW & EDIT as relative paths */}
  <Route
    path="jobs/new"
    element={
      <PrivateRoute>
        <JobPostPage />
      </PrivateRoute>
    }
  />
  <Route
    path="jobs/:id/edit"
    element={
      <PrivateRoute>
        <JobPostPage />
      </PrivateRoute>
    }
  />
</Route>


        {/* PROFILE EDIT */}
        <Route path="/profile/edit" element={<EditFullProfile />} />

        {/* JOBS (JOBSEEKER) */}
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* JOBSEEKER TABS */}
        <Route
          path="/jobseeker/applications"
          element={<JobseekerApplications />}
        />
        <Route path="/jobseeker/saved" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
