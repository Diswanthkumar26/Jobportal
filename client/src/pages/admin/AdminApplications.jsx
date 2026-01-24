// src/pages/admin/AdminApplications.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    api
      .get("/admin/applications")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (app, newStatus) => {
  try {
    setUpdatingId(app.id);
    await api.patch(`/admin/applications/${app.id}/status`, {
      status: newStatus,
    });
    // refetch
    const res = await api.get("/admin/applications");
    setApps(res.data);
  } catch (err) {
    console.error("Failed to update status", err);
  } finally {
    setUpdatingId(null);
  }
};

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-3 sm:px-4 lg:px-0">
      <h2 className="text-xl font-semibold">Applications</h2>

      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Job</th>
              <th className="px-4 py-2 text-left">Candidate</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Applied</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
  <tr key={a.id} className="border-t">
    <td className="px-4 py-2">{a.id}</td>
    <td className="px-4 py-2">{a.jobTitle}</td>
    <td className="px-4 py-2">{a.seekerEmail}</td>
    <td className="px-4 py-2">
      <select
        className="border rounded px-2 py-1 text-xs"
        value={a.status || ""}
        disabled={updatingId === a.id}
        onChange={(e) => handleStatusChange(a, e.target.value)}
      >
        <option value="">Pending</option>
        <option value="SHORTLISTED">Shortlisted</option>
        <option value="REJECTED">Rejected</option>
      </select>
    </td>
    <td className="px-4 py-2">
      {new Date(a.appliedAt).toLocaleDateString()}
    </td>
  </tr>
))}

            {apps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
