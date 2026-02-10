import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EmployerCandidatesPage() {
  const employerId = Number(localStorage.getItem("userId")) || 1;

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selectedJobId, setSelectedJobId] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const loadJobs = async () => {
    const res = await api.get(`/employer/${employerId}/jobs`);
    setJobs(res.data || []);
  };

  const loadApplications = async () => {
    const res = await api.get(`/employer/${employerId}/applications`);
    setApplications(res.data || []);
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  useEffect(() => {
    let data = [...applications];

    if (selectedJobId) {
      data = data.filter(a => a.jobId === Number(selectedJobId));
    }
    if (statusFilter !== "ALL") {
      data = data.filter(a => a.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        a =>
          a.candidateName.toLowerCase().includes(q) ||
          a.candidateEmail.toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  }, [applications, selectedJobId, statusFilter, search]);

  const total = applications.length;
  const shortlisted = applications.filter(a => a.status === "SHORTLISTED").length;
  const rejected = applications.filter(a => a.status === "REJECTED").length;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {/* Header + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Candidates</h1>
          <p className="text-sm text-slate-500">
            Applicants for your posted jobs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={selectedJobId}
            onChange={e => setSelectedJobId(e.target.value)}
          >
            <option value="">All jobs</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
          </select>

          <input
            type="text"
            placeholder="Search candidate..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatCard label="Total applicants" value={total} />
        <StatCard label="Shortlisted" value={shortlisted} />
        <StatCard label="Rejected" value={rejected} />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2">Candidate</th>
              <th className="px-4 py-2">Job</th>
              <th className="px-4 py-2">Applied</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  No candidates found
                </td>
              </tr>
            )}

            {filtered.map(app => (
              <tr key={app.id} className="border-b last:border-none">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">
                    {app.candidateName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {app.candidateEmail}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{app.jobTitle}</td>
                <td className="px-4 py-3 text-slate-700">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      app.status === "SHORTLISTED"
                        ? "bg-emerald-100 text-emerald-700"
                        : app.status === "REJECTED"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="text-xs font-medium text-indigo-600 hover:underline">
                      View profile
                    </button>
                    <button className="text-xs font-medium text-slate-600 hover:underline">
                      Message
                    </button>
                    {/* later: dropdown/change status */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}
