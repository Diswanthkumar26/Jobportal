// src/components/common/AdminNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (email && role) {
      setUser({ email, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-semibold text-lg text-slate-900">
            JobPortal Admin
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {user && (
            <span className="text-gray-600">
              {user.email} ({user.role})
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-gray-900 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
