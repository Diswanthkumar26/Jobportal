// client/src/pages/jobseeker/MyApplications.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../../services/applicationsApi";

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("ALL"); // ALL | ACTIVE | REJECTED

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyApplications();
        console.log("my applications", res.data);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const clearAll = () => {
    // UI‑only clear
    setApplications([]);
  };

  const visibleApps = applications.filter((app) => {
    const s = app.status || "APPLIED";
    if (tab === "ALL") return true;
    if (tab === "ACTIVE") return s === "APPLIED" || s === "SHORTLISTED";
    if (tab === "REJECTED") return s === "REJECTED";
    return true;
  });

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
            My Applications ({applications.length})
          </h1>

          {applications.length > 0 ? (
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
        {applications.length === 0 ? (
          <p className="text-sm text-slate-500">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-4 text-xs">
              <button
                onClick={() => setTab("ALL")}
                className={
                  "px-3 py-1 rounded-full " +
                  (tab === "ALL"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-100 text-slate-600")
                }
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setTab("ACTIVE")}
                className={
                  "px-3 py-1 rounded-full " +
                  (tab === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600")
                }
              >
                In review (
                {
                  applications.filter((a) =>
                    ["APPLIED", "SHORTLISTED"].includes(a.status || "APPLIED")
                  ).length
                }
                )
              </button>
              <button
                onClick={() => setTab("REJECTED")}
                className={
                  "px-3 py-1 rounded-full " +
                  (tab === "REJECTED"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-slate-100 text-slate-600")
                }
              >
                Rejected (
                {
                  applications.filter(
                    (a) => (a.status || "") === "REJECTED"
                  ).length
                }
              </button>
            </div>

            <div className="space-y-3">
              {visibleApps.map((app) => (
                <div
                  key={app.id}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm md:text-base font-semibold text-slate-900">
                        {app.job?.title || "Untitled job"}
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500">
                        {app.job?.company || "Unknown company"}
                      </p>
                    </div>

                    <span
                      className={
                        "px-2 py-[2px] rounded-full text-[11px] font-semibold " +
                        (app.status === "REJECTED"
                          ? "bg-rose-100 text-rose-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-emerald-50 text-emerald-600")
                      }
                    >
                      {app.status || "SUBMITTED"}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] md:text-xs text-slate-500">
                    Applied on{" "}
                    {app.appliedAt
                      ? new Date(app.appliedAt).toLocaleString()
                      : "Unknown date"}
                  </div>

                  {app.resumeUrl && (
                    <div className="mt-2 text-[11px] md:text-xs">
                      <span className="text-slate-500">Resume: </span>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline break-all"
                      >
                        {app.resumeUrl}
                      </a>
                    </div>
                  )}

                  {app.note && (
                    <p className="mt-2 text-[11px] md:text-xs text-slate-600">
                      <span className="font-medium">Note: </span>
                      {app.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
