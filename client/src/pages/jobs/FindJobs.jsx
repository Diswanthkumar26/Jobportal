// src/pages/FindJobs.jsx
import React, { useState } from "react";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Bengaluru, India",
    type: "Full-time",
    level: "Junior",
    salary: "₹6L – ₹10L",
    tags: ["React", "Tailwind", "JavaScript"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Nimbus Tech",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    salary: "₹12L – ₹18L",
    tags: ["Java", "Spring Boot", "SQL"],
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Pixel Studio",
    location: "Chennai, India",
    type: "Contract",
    level: "Junior",
    salary: "₹4L – ₹8L",
    tags: ["Figma", "Prototyping"],
    posted: "3 days ago",
  },
];

export default function FindJobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchSearch =
      search.trim().length === 0 ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchLocation =
      location.trim().length === 0 ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchType = type === "All" || job.type === type;

    return matchSearch && matchLocation && matchType;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">
              JobPortal
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm">
            <button className="text-slate-600 hover:text-indigo-600">
              Find Jobs
            </button>
            <button className="text-slate-600 hover:text-indigo-600">
              Companies
            </button>
            <button className="text-slate-600 hover:text-indigo-600">
              My Applications
            </button>
          </nav>

          <button className="px-3 py-1.5 text-sm font-medium rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
            Post a job
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="lg:w-72 space-y-4">
          <section className="bg-white rounded-lg border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Search
            </h2>
            <input
              type="text"
              placeholder="Job title or company"
              className="w-full mb-3 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </section>

          <section className="bg-white rounded-lg border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Job type
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              {["All", "Full-time", "Part-time", "Contract"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={type === t}
                    onChange={() => setType(t)}
                    className="h-4 w-4 text-indigo-600 border-slate-300"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* Job list */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Find your next job
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {filteredJobs.length} jobs found
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-lg border border-slate-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:border-indigo-400 hover:shadow-sm transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      {job.posted}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {job.salary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                    Apply now
                  </button>
                  <button className="px-3 py-1.5 text-xs md:text-sm rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
                    Save
                  </button>
                </div>
              </article>
            ))}

            {filteredJobs.length === 0 && (
              <div className="bg-white border border-dashed border-slate-300 rounded-lg p-6 text-center text-sm text-slate-500">
                No jobs match your filters. Try changing your search or
                location.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
