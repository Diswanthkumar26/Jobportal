import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function StatCard({ label, value, loading }) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-slate-900 text-slate-50 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{loading ? "…" : value}</p>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function EmployerHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    openJobs: 0,
    newApplicationsToday: 0,
    pendingReviews: 0,
    upcomingInterviews: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/employer/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load employer stats", err);
        toast.error("Failed to load dashboard");
      } finally {
        setLoadingStats(false);
      }
    };
    loadStats();
  }, []);

  const goPostJob = () => navigate("/employer/jobs/post");
  const goJobs = () => navigate("/employer/jobs");
  const goCandidates = () => navigate("/employer/candidates");

  return (
    <div className="space-y-4">
      {/* Header / actions */}
      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              Employer home
            </p>
            <h1 className="mt-1 text-xl font-semibold">Good morning,</h1>
            <p className="mt-1 text-sm text-slate-500">
              Here is an overview of your hiring pipeline today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={goPostJob}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              + Post job
            </button>
            <button
              onClick={goCandidates}
              className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View candidates
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open jobs"
          value={stats.openJobs}
          loading={loadingStats}
        />
        <StatCard
          label="New applications today"
          value={stats.newApplicationsToday}
          loading={loadingStats}
        />
        <StatCard
          label="Pending reviews"
          value={stats.pendingReviews}
          loading={loadingStats}
        />
        <StatCard
          label="Upcoming interviews"
          value={stats.upcomingInterviews}
          loading={loadingStats}
        />
      </section>

      {/* Main grid */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* Left: tasks */}
        <div className="space-y-3 lg:col-span-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Next actions
              </h2>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                View all
              </button>
            </div>
            <ul className="space-y-2">
              {[
                'Review new applications for “Frontend Developer”',
                "Respond to unread candidate messages",
                'Schedule interviews for “Senior Backend Engineer”',
                'Update salary range for “UI/UX Designer” posting',
              ].map((task, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                >
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-amber-400" />
                  <div className="text-sm text-slate-700">{task}</div>
                  <button
                    onClick={goJobs}
                    className="ml-auto text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-1 text-sm font-semibold text-slate-900">
              Today&apos;s overview
            </h2>
            <p className="text-xs text-slate-500">
              Quick snapshot of your pipeline performance. Replace these
              placeholders with charts later.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <MiniMetric label="Applications this week" value="138" />
              <MiniMetric label="Interview rate" value="32%" />
              <MiniMetric label="Offer acceptance" value="78%" />
              <MiniMetric label="Time to hire" value="18 days" />
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-600 p-4 text-sm text-indigo-50 shadow-sm">
            <p className="mb-1 font-semibold">Need more candidates?</p>
            <p className="mb-3 text-xs">
              Reach more job seekers by boosting your top 3 roles.
            </p>
            <button
              onClick={goPostJob}
              className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"
            >
              Explore boosting options
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
