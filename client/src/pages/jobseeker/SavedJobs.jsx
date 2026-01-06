// src/pages/jobseeker/SavedJobs.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/JobCard";
import api from "../../services/api";

export default function SavedJobs() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email") || "guest";
  const SAVED_KEY = `savedJobs:${userEmail}`;

  const [savedIds, setSavedIds] = useState(() => {
    const stored = localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/jobs");
        setAllJobs(res.data);
      } catch (e) {
        console.error("Failed to load jobs for saved list", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const savedJobs = useMemo(
    () => allJobs.filter((job) => savedIds.includes(job.id)),
    [allJobs, savedIds]
  );

  const clearAll = () => {
    localStorage.removeItem(SAVED_KEY);
    setSavedIds([]);
  };

  const toggleSaveJob = (job) => {
    setSavedIds((prev) => {
      const next = prev.includes(job.id)
        ? prev.filter((id) => id !== job.id)
        : [...prev, job.id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (loading) {
    return (
      <p className="text-sm text-slate-500 px-4 py-8">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs md:text-sm text-slate-600 hover:text-indigo-600"
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

          <h1 className="text-sm md:text-base font-semibold text-slate-900">
            Saved Jobs ({savedJobs.length})
          </h1>

          {savedJobs.length > 0 ? (
            <button
              onClick={clearAll}
              className="text-xs md:text-sm text-red-500 hover:text-red-600"
            >
              Clear all
            </button>
          ) : (
            <span />
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-10">
        {savedJobs.length === 0 ? (
          <p className="text-sm text-slate-500">
            You have not saved any jobs yet.
          </p>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onOpen={(j) => navigate(`/jobs/${j.id}`)}
                onSave={toggleSaveJob}
                isSaved={savedIds.includes(job.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
