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

import PrivateRoute from "./routes/PrivateRoute";

import EditFullProfile from "./pages/profile/EditFullProfile";
import FindJobs from "./pages/jobs/FindJobs"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
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

        {/* HOME PAGE */}
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
  path="/home/employer"
  element={
    <PrivateRoute>
      <EmployerHome />
    </PrivateRoute>
  }
/>

        <Route
          path="/employer/dashboard"
          element={
            <PrivateRoute>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/profile/edit" element={<EditFullProfile />} />
        <Route path="/profile/edit" element={<EditFullProfile />} />
<Route path="/jobs" element={<FindJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
