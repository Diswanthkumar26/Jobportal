// src/pages/jobs/FindJobs.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/common/Navbar";
import JobCard from "../../components/JobCard";
import { MOCK_JOBS } from "../../data/mockJobs";
import { getJobSeekerProfile } from "../../services/profileApi";

export default function FindJobs() {
  const navigate = useNavigate();

  // per-user saved key
  const userEmail = (localStorage.getItem("email") || "guest").toLowerCase();
  const SAVED_KEY = `savedJobs:${userEmail}`;

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");
  const [visibleCount, setVisibleCount] = useState(10);

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // profile + fields for completeness (same structure as JobseekerHome)
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(null);

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
      .then((res) => {
        setJobs(res.data || MOCK_JOBS);
      })
      .catch(() => setJobs(MOCK_JOBS));
  }, []);

  // load profile for navbar + completeness (reuse dashboard/home logic)
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
        console.error("Failed to load profile for find jobs completeness", e);
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
      <Navbar profile={profileWithCompleteness} />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-6">
        {/* TODO: your filters UI here, reusing keyword/location/jobType/sortBy/allLocations/jobTypes */}

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
