// src/pages/home/JobseekerHome.jsx
import React, { useEffect, useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ProfileProgressNav from "../../components/ProfileProgressNav";

export default function JobseekerHome() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("All locations");
  const [keyword, setKeyword] = useState("");
  const [profile, setProfile] = useState(null);

  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // navbar state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    api.get("/users/me").then((res) => setProfile(res.data));
  }, []);
  useEffect(() => {
  api.get("/users/me").then((res) => {
    setProfile(res.data);
    localStorage.setItem("userId", res.data.id); // add this line
  });
}, []);

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const allLocations = useMemo(
    () =>
      Array.from(new Set(jobs.map((job) => job.location))).filter(Boolean),
    [jobs]
  );

  const filteredLocations = ["All locations", ...allLocations].filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (location === "All locations" || job.location === location) &&
          (keyword === "" ||
            job.title.toLowerCase().includes(keyword.toLowerCase()))
      ),
    [jobs, location, keyword]
  );

  // Simple recommendation: prefer same location + skill match in title/description
  const recommendedJobs = useMemo(() => {
    if (!profile) return [];
    const skills = (profile.skills || []).map((s) => s.toLowerCase());
    if (skills.length === 0 && !profile.location) return [];
    return filteredJobs
      .map((job) => {
        const text =
          (job.title || "").toLowerCase() +
          " " +
          (job.description || "").toLowerCase();
        const skillMatches = skills.filter((s) => text.includes(s)).length;
        const sameLoc =
          profile.location &&
          job.location &&
          job.location.toLowerCase() === profile.location.toLowerCase();
        const score = skillMatches * 2 + (sameLoc ? 3 : 0);
        return { job, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.job);
  }, [filteredJobs, profile]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setLocationQuery(loc === "All locations" ? "" : loc);
    setShowLocationDropdown(false);
  };

  const JobCard = ({ job, compact = false }) => (
    <article
      onClick={() => navigate(`/jobs/${job.id}`)}
      className={`px-4 md:px-6 py-4 hover:bg-slate-50 cursor-pointer transition ${
        compact ? "border border-slate-100 rounded-xl" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-slate-900">
            {job.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{job.companyName}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span>{job.location}</span>
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <span>💰</span>
                <span>{job.salary}</span>
              </span>
            )}
            {job.createdAt && (
              <span className="flex items-center gap-1">
                <span>📅</span>
                <span>
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </span>
            )}
          </div>
          {job.description && (
            <p className="mt-2 text-xs md:text-sm text-slate-600 max-w-3xl line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
        <div className="flex md:flex-col items-end gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
            {job.employmentType || "Full-time"}
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4 md:py-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="font-semibold text-lg md:text-xl text-slate-900">
              JobPortal
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <NavLink
              to="/home/jobseeker"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              Find a Job
            </NavLink>
            <button
              onClick={() => navigate("/dashboard/jobseeker")}
              className="cursor-pointer text-slate-600 hover:text-indigo-600"
            >
              Dashboard
            </button>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 relative">
            {profile && (
              <div
                className="cursor-pointer"
                onClick={() => setProfileMenuOpen((v) => !v)}
              >
                <ProfileProgressNav
                  percent={profile.profileCompletedPercentage ?? 40}
                  image={profile.photoUrl ?? "/default-avatar.jpg"}
                />
              </div>
            )}
            <button
              onClick={logout}
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden hover:bg-slate-200"
            >
              <span className="text-xs font-semibold text-slate-700">⎋</span>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white border border-slate-200 rounded-lg shadow-lg text-xs text-slate-700">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-slate-50"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    navigate("/dashboard/jobseeker");
                  }}
                >
                  View profile
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-slate-50"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={logout}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
            >
              <span className="text-[11px] font-semibold text-slate-700">
                ⎋
              </span>
            </button>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile nav sheet */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="flex flex-col px-4 py-3 text-sm">
              <NavLink
                to="/home/jobseeker"
                className={({ isActive }) =>
                  `py-2 ${
                    isActive ? "text-indigo-600 font-medium" : "text-slate-700"
                  }`
                }
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `py-2 ${
                    isActive ? "text-indigo-600 font-medium" : "text-slate-700"
                  }`
                }
                onClick={() => setMobileNavOpen(false)}
              >
                Find a Job
              </NavLink>
              <button
                className="py-2 text-left text-slate-700"
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate("/dashboard/jobseeker");
                }}
              >
                Dashboard
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero + search */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
              Find your next dream job
            </h1>
            <p className="text-sm md:text-base text-indigo-100">
              Thousands of jobs in leading companies are waiting for you.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-stretch overflow-hidden">
              {/* Keyword input */}
              <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200">
                <span className="text-slate-400 mr-2 text-lg">🔍</span>
                <input
                  placeholder="Job title, keywords, or company"
                  className="flex-1 text-xs md:text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              {/* Location typeahead */}
              <div className="relative w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200">
                <div className="flex items-center px-4 py-3 text-xs md:text-sm">
                  <span className="text-slate-400 mr-2 text-lg">📍</span>
                  <input
                    type="text"
                    placeholder="Location (type to search)"
                    className="flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                  />
                </div>

                {showLocationDropdown && filteredLocations.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-20 bg-white border border-slate-200 rounded-b-lg max-h-52 overflow-y-auto text-xs md:text-sm shadow-lg">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => handleLocationSelect(loc)}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button className="w-full md:w-40 bg-indigo-500 hover:bg-indigo-600 text-sm font-medium text-white px-6 py-3">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* Recommended jobs */}
        {recommendedJobs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Recommended for you
              </h2>
              <span className="text-[11px] text-slate-500">
                Based on your profile
              </span>
            </div>
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          </section>
        )}

        {/* All jobs */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-800">
              {filteredJobs.length} Jobs Found
            </div>
            <button className="flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-slate-800">
              <span>Filters</span>
              <span className="text-lg">⚙️</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredJobs.length === 0 && (
              <p className="px-4 md:px-6 py-6 text-sm text-slate-500">
                No jobs found.
              </p>
            )}
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Scroll to top */}
        <button
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </main>
    </div>
  );
}
