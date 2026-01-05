// src/pages/employer/EmployerJobsPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/employer/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to load employer jobs", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h1 className="mb-2 text-base font-semibold text-slate-900">Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-sm text-slate-500">No jobs posted yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
            >
              <div>
                <p className="font-medium text-slate-900">{job.title}</p>
                <p className="text-xs text-slate-500">{job.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/employer/jobs/${job.id}`}
                  className="text-xs font-medium text-indigo-600 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() =>
                    navigate(`/employer/jobs/${job.id}/applicants`)
                  }
                  className="text-xs font-medium text-slate-700 hover:text-indigo-600"
                >
                  Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
