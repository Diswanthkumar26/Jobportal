// src/pages/employer/EmployerJobApplicantsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerJobApplicantsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const jobRes = await api.get(`/jobs/${jobId}`);
        setJob(jobRes.data);

        const res = await api.get(`/employer/jobs/${jobId}/applicants`);
        setApplicants(res.data || []);
      } catch (err) {
        console.error(err);
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
        <p className="text-sm text-slate-500">Loading applicants…</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-slate-900">
            Applicants
          </h1>
          {job && (
            <p className="text-xs text-slate-500">
              {job.title} · {job.location}
            </p>
          )}
        </div>
        <Link
          to="/employer/jobs"
          className="text-xs text-indigo-600 hover:underline"
        >
          Back to jobs
        </Link>
      </div>

      {applicants.length === 0 ? (
        <p className="text-sm text-slate-500">No applications yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {applicants.map((app) => (
            <li key={app.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {app.jobSeeker?.name || app.applicantName}
                </p>
                <p className="text-xs text-slate-500">
                  {app.jobSeeker?.email || app.applicantEmail}
                </p>
              </div>

              {app.jobSeeker?.resumeUrl && (
                <a
                  href={app.jobSeeker.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-indigo-600 hover:underline"
                >
                  View resume
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
