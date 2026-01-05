import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileProgressNav from "../ProfileProgressNav"

const Navbar = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <>
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center py-3 px-4 md:py-4">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-semibold text-lg md:text-xl text-slate-900">
            JobPortal
          </span>
        </div>

        {/* Center nav */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <NavLink
              to="/home/jobseeker"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to="/jobseeker/applications"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              My Applications
            </NavLink>
            <NavLink
              to="/jobseeker/saved"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive ? "text-indigo-600 font-medium" : "text-slate-600"
                } hover:text-indigo-600`
              }
            >
              Saved
            </NavLink>
          </nav>
        </div>

        {/* Right avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <button
              className="cursor-pointer"
              onClick={() => navigate("/dashboard/jobseeker")}
            >
              {profile && profile.photoUrl ? (
                <ProfileProgressNav
                  percent={profile.profileCompletedPercentage ?? 40}
                  image={profile.photoUrl}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
                  {(profile?.name?.[0] || "U").toUpperCase()}
                </div>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center">
            <button
              className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center"
              onClick={() => navigate("/dashboard/jobseeker")}
            >
              {profile && profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[11px] font-semibold text-slate-700">
                  {(profile?.name?.[0] || "U").toUpperCase()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-slate-200 flex justify-around items-center py-2 md:hidden">
        <NavLink
          to="/home/jobseeker"
          className={({ isActive }) =>
            `flex flex-col items-center text-[11px] ${
              isActive ? "text-indigo-600" : "text-slate-600"
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex flex-col items-center text-[11px] ${
              isActive ? "text-indigo-600" : "text-slate-600"
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a4 4 0 018 0v2" />
          </svg>
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/jobseeker/applications"
          className={({ isActive }) =>
            `flex flex-col items-center text-[11px] ${
              isActive ? "text-indigo-600" : "text-slate-600"
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M5 4h14v16H5z" />
            <path d="M9 8h6" />
            <path d="M9 12h6" />
            <path d="M9 16h3" />
          </svg>
          <span>Applied</span>
        </NavLink>

        <NavLink
          to="/jobseeker/saved"
          className={({ isActive }) =>
            `flex flex-col items-center text-[11px] ${
              isActive ? "text-indigo-600" : "text-slate-600"
            }`
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5v15l-6-3.5-6 3.5v-15Z" />
          </svg>
          <span>Saved</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
