import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const STATUS_OPTIONS = ["PENDING", "ACTIVE", "REJECTED", "CLOSED"];

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);

  const loadJobs = () => {
    setLoading(true);
    const params = {};
    if (statusFilter !== "ALL") params.status = statusFilter;

    api
      .get("/admin/jobs", { params })
      .then((res) => setJobs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter]);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      setUpdatingId(jobId);
      await api.patch(`/admin/jobs/${jobId}/status`, { status: newStatus });
      await loadJobs();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Employer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Moderate</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="px-4 py-2">{j.id}</td>
                <td className="px-4 py-2">
                  <Link
                    className="text-indigo-600 hover:underline"
                    to={`/jobs/${j.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {j.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{j.employerName}</td>
                <td className="px-4 py-2">{j.status}</td>
                <td className="px-4 py-2">
                  <select
                    value={j.status}
                    disabled={updatingId === j.id}
                    onChange={(e) =>
                      handleStatusChange(j.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={5}>
                  No jobs match filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
