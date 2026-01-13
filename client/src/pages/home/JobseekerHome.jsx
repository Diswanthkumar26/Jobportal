import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getJobSeekerProfile } from "../../services/profileApi";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/common/Navbar";
import { MOCK_JOBS } from "../../data/mockJobs";

export default function JobseekerHome() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");

  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [typeFilter, setTypeFilter] = useState("any");
  const [expFilter, setExpFilter] = useState("any");
  const [sortBy, setSortBy] = useState("relevant");

  // profile + fields for completeness
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(null);

  // per-user saved key
  const userEmail = (localStorage.getItem("email") || "guest").toLowerCase();
  const SAVED_KEY = `savedJobs:${userEmail}`;

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedJobs));
  }, [savedJobs, SAVED_KEY]);

  const toggleSaveJob = (job) => {
    const id = job.id ?? job.jobId;
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // load jobs
  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => setJobs(res.data || MOCK_JOBS))
      .catch((err) => {
        console.warn("Jobs API failed, using mock data", err);
        setJobs(MOCK_JOBS);
      });
  }, []);

  // load profile for navbar + completeness (same logic as dashboard)
  useEffect(() => {
    (async () => {
      try {
        const res = await getJobSeekerProfile();
        const p = res.data;
        const u = p.user || {};

        const mappedProfile = {
          name: `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim(),
          headline: p.currentRole || "",
          location: p.currentCity || "",
          photoUrl: u.photoUrl || "",
        };
        setProfile(mappedProfile);

        setAbout(p.about || u.about || "");

        if (p.skills) {
          setSkills(
            p.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          );
        } else if (Array.isArray(u.skills)) {
          setSkills(u.skills);
        } else {
          setSkills([]);
        }

        if (p.experiencesJson) {
          setExperience(JSON.parse(p.experiencesJson));
        } else if (Array.isArray(u.experiences)) {
          setExperience(u.experiences);
        } else {
          setExperience([]);
        }

        if (p.projectsJson) {
          setProjects(JSON.parse(p.projectsJson));
        } else if (Array.isArray(u.projects)) {
          setProjects(u.projects);
        } else {
          setProjects([]);
        }

        if (p.certificationsJson) {
          setCertifications(JSON.parse(p.certificationsJson));
        } else if (Array.isArray(u.certifications)) {
          setCertifications(u.certifications);
        } else {
          setCertifications([]);
        }

        const ru = p.resumeUrl || p.resume_url || null;
        setResumeUrl(ru);
      } catch (e) {
        console.error("Failed to load profile for home completeness", e);
      }
    })();
  }, []);

  const hasBasic =
    (profile?.name && profile.name.trim().length > 0) ||
    (profile?.headline && profile.headline.trim().length > 0) ||
    (profile?.location && profile.location.trim().length > 0) ||
    (profile?.photoUrl && profile.photoUrl.trim().length > 0);

  const completeness = useMemo(() => {
    let filledParts = 0;
    const totalParts = 7; // basic, about, exp, projects, skills, resume, certs

    if (hasBasic) filledParts += 1;
    if (about) filledParts += 1;
    if (experience.length) filledParts += 1;
    if (projects.length) filledParts += 1;
    if (skills.length) filledParts += 1;
    if (resumeUrl) filledParts += 1;
    if (certifications.length) filledParts += 1;

    return Math.round((filledParts / totalParts) * 100);
  }, [
    hasBasic,
    about,
    experience.length,
    projects.length,
    skills.length,
    resumeUrl,
    certifications.length,
  ]);

  const profileWithCompleteness = profile
    ? { ...profile, profileCompletedPercentage: completeness, skills }
    : null;

  // locations, filters
  const allLocations = useMemo(
    () =>
      Array.from(new Set(jobs.map((job) => job.location))).filter(Boolean),
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

  const filteredLocations = ["All locations", ...allLocations].filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const company = job.company?.toLowerCase() || "";
    const loc = job.location?.toLowerCase() || "";
    const type = (job.jobType || job.type || "").trim().toLowerCase();
    const exp = (job.experience || "").trim();
    const kw = keyword.toLowerCase();

    const matchesKeyword =
      kw === "" || title.includes(kw) || company.includes(kw) || loc.includes(kw);

    const matchesLocation =
      location === "all" || loc === location.toLowerCase();

    const matchesJobType =
      jobType === "all" || type === jobType.trim().toLowerCase();

    const matchesTypeFilter =
      typeFilter === "any" || type === typeFilter.trim().toLowerCase();

    const matchesExpFilter =
      expFilter === "any" || exp === expFilter;

    return (
      matchesKeyword &&
      matchesLocation &&
      matchesJobType &&
      matchesTypeFilter &&
      matchesExpFilter
    );
  });

  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === "newest") {
      list.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortBy === "salaryHigh") {
      list.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    }
    return list;
  }, [filteredJobs, sortBy]);

  const recommendedJobs = useMemo(() => {
    if (!profileWithCompleteness) return [];
    const skillsLower = (skills || []).map((s) => s.toLowerCase());
    if (skillsLower.length === 0 && !profileWithCompleteness.location) return [];
    return filteredJobs
      .map((job) => {
        const text =
          (job.title || "").toLowerCase() +
          " " +
          (job.description || "").toLowerCase();
        const skillMatches = skillsLower.filter((s) => text.includes(s)).length;
        const sameLoc =
          profileWithCompleteness.location &&
          job.location &&
          job.location.toLowerCase() ===
            profileWithCompleteness.location.toLowerCase();
        const score = skillMatches * 2 + (sameLoc ? 3 : 0);
        return { job, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.job);
  }, [filteredJobs, profileWithCompleteness, skills]);

  const handleLocationSelect = (loc) => {
    if (loc === "All locations") {
      setLocation("all");
      setLocationQuery("");
    } else {
      setLocation(loc.toLowerCase());
      setLocationQuery(loc);
    }
    setShowLocationDropdown(false);
  };
console.log("HOME completeness", completeness, profileWithCompleteness);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar profile={profileWithCompleteness} />
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
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="5" />
                  <path d="M16 16l3 3" />
                </svg>
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
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s-6-5.1-6-10a6 6 0 1112 0c0 4.9-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2.3" />
                  </svg>
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

              {/* Type + Experience filters */}
              <div className="w-full md:w-72 flex border-b md:border-b-0 md:border-r border-slate-200">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-1/2 border-r border-slate-200 px-3 py-3 text-[11px] md:text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="any">Any type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <select
                  value={expFilter}
                  onChange={(e) => setExpFilter(e.target.value)}
                  className="w-1/2 px-3 py-3 text-[11px] md:text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="any">Any exp.</option>
                  <option value="0-2">0–2 yrs</option>
                  <option value="2-4">2–4 yrs</option>
                  <option value="4+">4+ yrs</option>
                </select>
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
                <JobCard
                  key={job.id}
                  job={job}
                  onOpen={(j) => navigate(`/jobs/${j.id}`)}
                  onSave={toggleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All jobs */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-800">
              {sortedJobs.length} Jobs Found
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs md:text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="relevant">Most relevant</option>
                <option value="newest">Newest first</option>
                <option value="salaryHigh">Salary high → low</option>
              </select>

              <button className="hidden md:inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-slate-800">
                <span>Filters</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 4h16l-5.5 6.5v5l-5 2v-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {sortedJobs.length === 0 && (
              <p className="px-4 md:px-6 py-6 text-sm text-slate-500">
                No jobs found.
              </p>
            )}
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onOpen={(j) => navigate(`/jobs/${j.id}`)}
                onSave={toggleSaveJob}
                isSaved={savedJobs.includes(job.id)}
              />
            ))}
          </div>
        </section>

        {/* Scroll to top */}
        <button
          className="fixed bottom-16 right-6 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg md:bottom-6"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 5l-6 6h4v8h4v-8h4z" />
          </svg>
        </button>
      </main>
    </div>
  );
}
