// src/pages/employer/EmployerJobsList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      // backend: return jobs for logged-in employer
      const res = await api.get("/employer/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="p-4 text-sm text-slate-500">Loading…</p>;

  if (!jobs.length)
    return <p className="p-4 text-sm text-slate-500">No jobs yet.</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">Jobs</h1>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{job.title}</p>
              <p className="text-xs text-slate-500">{job.location}</p>
            </div>

            <div className="flex gap-4 text-xs font-medium">
              {/* EMPLOYER view route */}
              <Link
                to={`/employer/jobs/${job.id}`}
                className="text-indigo-600 hover:underline"
              >
                View
              </Link>

              {/* Applicants page route */}
              <Link
                to={`/employer/jobs/${job.id}/applicants`}
                className="text-slate-600 hover:underline"
              >
                Applicants
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
