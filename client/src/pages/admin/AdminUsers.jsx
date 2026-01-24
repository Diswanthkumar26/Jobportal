// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggle = async (user) => {
    try {
      setUpdatingId(user.id);
      if (user.enabled) {
        await api.patch(`/admin/users/${user.id}/disable`);
      } else {
        await api.patch(`/admin/users/${user.id}/enable`);
      }
      loadUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
    if (statusFilter === "ACTIVE" && !u.enabled) return false;
    if (statusFilter === "DISABLED" && u.enabled) return false;
    return true;
  });

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-3 sm:px-4 lg:px-0">
      {/* header + filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All roles</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYER">Employer</option>
            <option value="JOBSEEKER">Jobseeker</option>
          </select>
          <select
            className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      u.enabled
                        ? "inline-flex rounded-full bg-green-100 text-green-700 px-3 py-0.5 text-xs"
                        : "inline-flex rounded-full bg-red-100 text-red-700 px-3 py-0.5 text-xs"
                    }
                  >
                    {u.enabled ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    disabled={updatingId === u.id}
                    onClick={() => handleToggle(u)}
                    className={
                      u.enabled
                        ? "px-3 py-1 rounded text-xs bg-red-600 text-white disabled:opacity-60"
                        : "px-3 py-1 rounded text-xs bg-green-600 text-white disabled:opacity-60"
                    }
                  >
                    {u.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={6}
                >
                  No users match filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
