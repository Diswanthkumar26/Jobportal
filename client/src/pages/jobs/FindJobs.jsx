// src/pages/jobs/FindJobs.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/common/Navbar";
import JobCard from "../../components/JobCard";
import { MOCK_JOBS } from "../../data/mockJobs";

export default function FindJobs({ profile }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem("savedJobs");
    return stored ? JSON.parse(stored) : [];
  });

  const [visibleCount, setVisibleCount] = useState(10); // pagination size

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSaveJob = (job) => {
    setSavedJobs((prev) =>
      prev.includes(job.id)
        ? prev.filter((id) => id !== job.id)
        : [...prev, job.id]
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
        jobType === "all" ||
        type === jobType.trim().toLowerCase();

      return matchesKeyword && matchesLocation && matchesJobType;
    });
  }, [jobs, keyword, location, jobType]);

  // reset pagination when filters change
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
        {/* Filters row */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 flex flex-wrap gap-2">
            <input
              placeholder="Search by title or company"
              className="flex-1 min-w-[180px] border border-slate-200 rounded-md px-3 py-1.5 text-xs md:text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-1.5 text-xs md:text-sm bg-white"
            >
              <option value="all">All locations</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-1.5 text-xs md:text-sm bg-white"
            >
              <option value="all">All job types</option>
              {jobTypes.map((jt) => (
                <option key={jt} value={jt.toLowerCase()}>
                  {jt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-slate-500">
              {sortedJobs.length} jobs
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-1.5 text-xs md:text-sm bg-white"
            >
              <option value="relevant">Most relevant</option>
              <option value="newest">Newest first</option>
              <option value="salaryHigh">Salary high → low</option>
            </select>
          </div>
        </section>

        {/* Jobs list with load more */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-800">
              Showing {visibleJobs.length} of {sortedJobs.length} jobs
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {visibleJobs.length === 0 && (
              <p className="px-4 md:px-6 py-6 text-sm text-slate-500">
                No jobs found.
              </p>
            )}
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onOpen={(j) => navigate(`/jobs/${j.id}`)}
                onSave={toggleSaveJob}
                isSaved={savedJobs.includes(job.id)}
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
