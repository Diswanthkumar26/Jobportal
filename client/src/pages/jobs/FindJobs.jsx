// src/pages/jobs/FindJobs.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/common/Navbar";
import JobCard from "../../components/JobCard";
import { MOCK_JOBS } from "../../data/mockJobs";

export default function FindJobs({ profile }) {
  const navigate = useNavigate();

  const userEmail = (localStorage.getItem("email") || "guest").toLowerCase();
  const SAVED_KEY = `savedJobs:${userEmail}`;
  console.log("FindJobs SAVED_KEY =", SAVED_KEY);

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedJobs));
  }, [savedJobs, SAVED_KEY]);

  const toggleSaveJob = (job) => {
    // support id or jobId
    const id = job.id ?? job.jobId;
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => setJobs(res.data || MOCK_JOBS))
      .catch(() => setJobs(MOCK_JOBS));
  }, []);

  const allLocations = useMemo(
    () =>
      Array.from(new Set(jobs.map((j) => j.location))).filter(Boolean),
    [jobs]
  );

  const jobTypes = useMemo(
    () =>
      Array.from(
        new Set(
          jobs
            .map((j) => (j.jobType || j.type || "").trim())
            .filter(Boolean)
        )
      ),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const kw = keyword.toLowerCase();

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const loc = job.location?.toLowerCase() || "";
      const type = (job.jobType || job.type || "").trim().toLowerCase();

      const matchesKeyword =
        kw === "" || title.includes(kw) || company.includes(kw) || loc.includes(kw);
      const matchesLocation =
        location === "all" || loc === location.toLowerCase();
      const matchesJobType =
        jobType === "all" || type === jobType.trim().toLowerCase();

      return matchesKeyword && matchesLocation && matchesJobType;
    });
  }, [jobs, keyword, location, jobType]);

  useEffect(() => {
    setVisibleCount(10);
  }, [keyword, location, jobType, sortBy, jobs.length]);

  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];

    if (sortBy === "newest") {
      list.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortBy === "salaryHigh") {
      list.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    }
    return list;
  }, [filteredJobs, sortBy]);

  const visibleJobs = sortedJobs.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedJobs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar profile={profile} />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-6">
        {/* filters ... */}

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="divide-y divide-slate-100">
            {visibleJobs.length === 0 && (
              <p className="px-4 md:px-6 py-6 text-sm text-slate-500">
                No jobs found.
              </p>
            )}
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id ?? job.jobId}
                job={job}
                onOpen={(j) => navigate(`/jobs/${j.id ?? j.jobId}`)}
                onSave={toggleSaveJob}
                isSaved={savedJobs.includes(job.id ?? job.jobId)}
              />
            ))}
          </div>

          {canLoadMore && (
            <div className="px-4 md:px-6 py-4 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 text-xs md:text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
