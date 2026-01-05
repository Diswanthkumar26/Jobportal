// src/pages/employer/EmployerJobApplicantsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerJobApplicantsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // 1) job basic info (optional but nice to show header)
        const jobRes = await api.get(`/jobs/${jobId}`);
        setJob(jobRes.data);

        // 2) applications for this job
        const appsRes = await api.get(
          `/employer/jobs/${jobId}/applications`
        );
        setApps(appsRes.data);
      } catch (err) {
        console.error("Failed to load job applicants", err);
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [jobId]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-slate-600 hover:text-indigo-600"
        >
          ← Back
        </button>
        {job && (
          <p className="text-xs text-slate-500">
            Job: <span className="font-medium text-slate-900">{job.title}</span>
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-2 text-base font-semibold text-slate-900">
          Applicants
        </h1>

        {apps.length === 0 ? (
          <p className="text-sm text-slate-500">
            No applications received for this job yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {apps.map((app) => (
              <li key={app.id} className="flex items-center gap-3 py-3">
                <div className="h-9 w-9 flex-none rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">
                  {app.candidateName?.[0] || "C"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    {app.candidateName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {app.candidateHeadline || "No headline"} ·{" "}
                    {app.candidateLocation || "Location not specified"}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                  {app.status || "NEW"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
