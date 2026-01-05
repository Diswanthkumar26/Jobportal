// src/pages/jobs/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import { getApplicationStatus, applyToJob } from "../../services/applicationsApi";


export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // /jobs/:id

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);

      // 1) job details
      const jobRes = await api.get(`/jobs/${id}`); // /api/jobs/{id}
      setJob(jobRes.data);

      // 2) already applied? backend returns boolean
      try {
        const statusRes = await getApplicationStatus(Number(id));
        const appliedFlag = Boolean(statusRes.data);   // <-- use a local name
        setApplied(appliedFlag);
      } catch (e) {
        // if 404 or any error, treat as not applied
        setApplied(false);
      }
    } catch (err) {
      console.error("Failed to load job or applications", err);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  load();
}, [id]);


  const handleApply = async () => {
    if (applied) return;
    try {
      setSubmitting(true);
      await applyToJob(Number(id));
      toast.success("Application submitted successfully.");
      setApplied(true);
    } catch (err) {
      console.error("Failed to apply", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data || "You have already applied to this job");
        setApplied(true);
      } else {
        toast.error("Failed to submit application");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm">
        Loading job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-red-500">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Back
          </button>

          <h1 className="text-sm font-semibold text-slate-900">Job Details</h1>
          <span />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {applied && (
          <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs text-emerald-700">
            Application submitted successfully.
          </div>
        )}

        <section className="bg-white rounded-2xl border border-slate-200 px-4 py-5 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-1">
            {job.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            {job.company} · {job.location}
          </p>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            {job.salaryRange} · {job.experience}
          </p>

          <div className="mt-4 text-xs md:text-sm text-slate-700">
            <h3 className="font-semibold mb-1">Job description</h3>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          <button
            disabled={submitting || applied}
            onClick={handleApply}
            className={`mt-6 w-full h-11 rounded-lg text-sm font-medium transition ${
              applied
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {applied
              ? "Already applied"
              : submitting
              ? "Applying..."
              : "Apply now"}
          </button>
        </section>
      </main>
    </div>
  );
}
