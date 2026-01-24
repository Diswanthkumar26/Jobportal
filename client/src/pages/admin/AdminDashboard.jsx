// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/summary")
      .then((res) => {
        setSummary(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load admin summary.");
      });
  }, []);

  if (error) {
    return (
      <div className="space-y-2">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="space-y-4">
        {/* heading skeleton */}
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

        {/* cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border p-4 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="mt-3 h-6 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Job Seekers", value: summary.jobSeekers },
    { label: "Employers", value: summary.employers },
    { label: "Active Jobs", value: summary.activeJobs },
    { label: "Applications Today", value: summary.applicationsToday },
  ];

  const recentJobs = summary.recentJobs || [];
  const recentApplications = summary.recentApplications || [];

  return (
    <div className="space-y-8">
      {/* Page title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Admin Dashboard
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col"
          >
            <span className="text-sm text-gray-500">{c.label}</span>
            <span className="mt-2 text-2xl font-semibold text-gray-900">
              {c.value}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <section className="bg-white rounded-xl shadow-sm border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentJobs.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-4 text-gray-500 text-sm"
                    colSpan={3}
                  >
                    No jobs yet.
                  </td>
                </tr>
              )}
              {recentJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-4 py-2 text-gray-900">{job.title}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {job.companyName}
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="bg-white rounded-xl shadow-sm border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Recent Applications
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentApplications.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-4 text-gray-500 text-sm"
                    colSpan={4}
                  >
                    No applications yet.
                  </td>
                </tr>
              )}
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td className="px-4 py-2 text-gray-900">
                    {app.jobTitle}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {app.seekerEmail}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
