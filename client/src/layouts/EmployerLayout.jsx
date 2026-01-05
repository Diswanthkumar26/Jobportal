import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-200/80"
      }`}
    >
      <span>{label}</span>
      {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
    </button>
  );
}

export default function EmployerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const go = (path) => {
    navigate(path);
    setSidebarOpen(false); // close drawer on mobile after click
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* mobile menu button */}
            <button
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
              JP
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">JobPortal</p>
              <p className="text-[11px] text-slate-500">Employer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative hidden h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 md:flex">
              <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-red-500" />
              <span aria-hidden="true">🔔</span>
            </button>
            <button
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
            >
              ⏏
            </button>
          </div>
        </div>
      </header>

      {/* Shell: sidebar + main */}
      <div className="mx-auto flex max-w-6xl gap-4 px-4 py-4">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 flex-col gap-2 md:flex">
          <NavItem
            label="Dashboard"
            active={isActive("/employer/home")}
            onClick={() => go("/employer/home")}
          />
          <NavItem
            label="Jobs"
            active={isActive("/employer/jobs")}
            onClick={() => go("/employer/jobs")}
          />
          <NavItem
            label="Candidates"
            active={isActive("/employer/candidates")}
            onClick={() => go("/employer/candidates")}
          />
          <NavItem
            label="Messages"
            active={isActive("/employer/messages")}
            onClick={() => go("/employer/messages")}
          />
          <NavItem
            label="Company profile"
            active={isActive("/employer/profile")}
            onClick={() => go("/employer/profile")}
          />
          <NavItem
            label="Billing"
            active={isActive("/employer/billing")}
            onClick={() => go("/employer/billing")}
          />
          <NavItem
            label="Settings"
            active={isActive("/employer/settings")}
            onClick={() => go("/employer/settings")}
          />

          <div className="mt-auto rounded-2xl bg-indigo-50 p-3 text-[11px] text-slate-700">
            <p className="mb-1 font-semibold">Tip</p>
            <p>Boost visibility by sponsoring high-priority roles.</p>
          </div>
        </aside>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* backdrop */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            {/* drawer */}
            <div className="relative flex h-full w-64 flex-col bg-white p-4 shadow-xl">
              <button
                className="absolute right-3 top-3 rounded-full p-1 hover:bg-slate-100"
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="mb-4 mt-1 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
                  JP
                </span>
                <span className="text-sm font-semibold">JobPortal</span>
              </div>

              <nav className="space-y-1 text-sm">
                <NavItem
                  label="Dashboard"
                  active={isActive("/employer/home")}
                  onClick={() => go("/employer/home")}
                />
                <NavItem
                  label="Jobs"
                  active={isActive("/employer/jobs")}
                  onClick={() => go("/employer/jobs")}
                />
                <NavItem
                  label="Candidates"
                  active={isActive("/employer/candidates")}
                  onClick={() => go("/employer/candidates")}
                />
                <NavItem
                  label="Messages"
                  active={isActive("/employer/messages")}
                  onClick={() => go("/employer/messages")}
                />
                <NavItem
                  label="Company profile"
                  active={isActive("/employer/profile")}
                  onClick={() => go("/employer/profile")}
                />
                <NavItem
                  label="Billing"
                  active={isActive("/employer/billing")}
                  onClick={() => go("/employer/billing")}
                />
                <NavItem
                  label="Settings"
                  active={isActive("/employer/settings")}
                  onClick={() => go("/employer/settings")}
                />
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
