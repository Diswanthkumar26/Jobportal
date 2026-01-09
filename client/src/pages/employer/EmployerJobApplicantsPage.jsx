// client/src/pages/employer/EmployerJobApplicantsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import {
  getApplicantsForJob,
  updateApplicationStatus,
} from "../../services/applicationsApi";
import toast from "react-hot-toast";

export default function EmployerJobApplicantsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const jobRes = await api.get(`/jobs/${jobId}`);
        setJob(jobRes.data);

        const res = await getApplicantsForJob(jobId);
        setApplicants(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId]);

  const filteredApplicants = applicants
    .filter((a) => {
      const s = a.status || "APPLIED";
      return statusFilter === "ALL" ? true : s === statusFilter;
    })
    .sort((a, b) => {
      const da = new Date(a.appliedAt);
      const db = new Date(b.appliedAt);
      return sortOrder === "LATEST" ? db - da : da - db;
    });

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Loading applicants…</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-slate-900">
            Applicants
          </h1>
          {job && (
            <p className="text-xs text-slate-500">
              {job.title} · {job.location}
            </p>
          )}
        </div>
        <Link
          to="/employer/jobs"
          className="text-xs text-indigo-600 hover:underline"
        >
          Back to jobs
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={
              "px-2 py-1 rounded-full " +
              (statusFilter === "ALL"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-slate-100 text-slate-600")
            }
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("APPLIED")}
            className={
              "px-2 py-1 rounded-full " +
              (statusFilter === "APPLIED"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600")
            }
          >
            Applied
          </button>
          <button
            onClick={() => setStatusFilter("SHORTLISTED")}
            className={
              "px-2 py-1 rounded-full " +
              (statusFilter === "SHORTLISTED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600")
            }
          >
            Shortlisted
          </button>
          <button
            onClick={() => setStatusFilter("REJECTED")}
            className={
              "px-2 py-1 rounded-full " +
              (statusFilter === "REJECTED"
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-100 text-slate-600")
            }
          >
            Rejected
          </button>
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="text-xs border border-slate-200 rounded px-2 py-1"
        >
          <option value="LATEST">Latest first</option>
          <option value="OLDEST">Oldest first</option>
        </select>
      </div>

      {filteredApplicants.length === 0 ? (
        <p className="text-sm text-slate-500">No applications yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {filteredApplicants.map((a, idx) => (
            <li
              key={a.applicationId ?? `app-${idx}`}
              className="py-3 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {a.name}
                </p>

                {a.headline && (
                  <p className="text-xs text-slate-500">{a.headline}</p>
                )}

                <p className="text-xs text-slate-500">
                  {a.location || "Location not specified"}
                </p>

                <p className="text-xs text-slate-500">
                  {a.email}
                  {a.phone && <> · {a.phone}</>}
                </p>

                <p className="text-xs text-slate-500">
                  Status: {a.status || "APPLIED"}
                  {a.appliedAt && (
                    <> · Applied on {new Date(a.appliedAt).toLocaleString()}</>
                  )}
                </p>

                {a.totalExperience && (
                  <p className="text-xs text-slate-500">
                    Experience: {a.totalExperience}
                  </p>
                )}

                {a.keySkills && (
                  <p className="text-xs text-slate-500">
                    Skills: {a.keySkills}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  {a.resumeUrl && (
                    <a
                      href={`http://localhost:8081${a.resumeUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-indigo-600 hover:underline"
                    >
                      View resume
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedApplicant(a)}
                    className="text-xs text-slate-600 underline"
                  >
                    View profile
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await updateApplicationStatus(
                          a.applicationId,
                          "SHORTLISTED"
                        );
                        setApplicants((prev) =>
                          prev.map((item) =>
                            item.applicationId === a.applicationId
                              ? { ...item, status: "SHORTLISTED" }
                              : item
                          )
                        );
                      } catch (e) {
                        console.error(e);
                        toast.error("Failed to update");
                      }
                    }}
                    className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await updateApplicationStatus(
                          a.applicationId,
                          "REJECTED"
                        );
                        setApplicants((prev) =>
                          prev.map((item) =>
                            item.applicationId === a.applicationId
                              ? { ...item, status: "REJECTED" }
                              : item
                          )
                        );
                      } catch (e) {
                        console.error(e);
                        toast.error("Failed to update");
                      }
                    }}
                    className="px-2 py-1 text-xs rounded bg-rose-100 text-rose-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* profile modal */}
      {selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg w-[420px] p-5 shadow-lg"
          >
            <h2 className="text-base font-semibold mb-2">
              {selectedApplicant.name}
            </h2>
            {selectedApplicant.headline && (
              <p className="text-xs text-slate-500 mb-1">
                {selectedApplicant.headline}
              </p>
            )}
            <p className="text-xs text-slate-500 mb-1">
              {selectedApplicant.location || "Location not specified"}
            </p>
            <p className="text-xs text-slate-500 mb-1">
              Experience: {selectedApplicant.totalExperience || "Not specified"}
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Skills: {selectedApplicant.keySkills || "Not specified"}
            </p>

            {selectedApplicant.resumeUrl && (
              <a
                href={`http://localhost:8081${selectedApplicant.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 underline"
              >
                View resume
              </a>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-3 py-1 text-xs bg-slate-100 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
