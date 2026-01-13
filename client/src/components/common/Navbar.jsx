import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileProgressNav from "../ProfileProgressNav";
import { normalizePhotoUrl } from "../../utils/photoUrl"; 
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";


export default function Navbar({ profile }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const percent =
    profile?.profileCompletedPercentage != null
      ? profile.profileCompletedPercentage
      : 40;

  // take whatever photo we have on the profile and normalize it
  const rawPhoto = profile?.photoUrl || "";
  const avatarUrl = normalizePhotoUrl(rawPhoto);
  console.log("NAVBAR avatarUrl", avatarUrl);

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

          
          {/* Right: profile progress with avatar + dropdown */}
<div className="relative flex items-center gap-3">
  <ProfileProgressNav
  percent={percent}
  image={avatarUrl}
  onClick={() => setOpen((prev) => !prev)}
/>

  {open && (
  <div className="absolute right-0 top-11 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-sm z-50">
    <button
      type="button"
      className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 focus:bg-slate-50"
      onClick={() => {
        setOpen(false);
        navigate("/dashboard/jobseeker");
      }}
    >
      <UserIcon className="w-4 h-4 text-slate-500" />
      <span>Profile</span>
    </button>

    <button
      type="button"
      className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 focus:bg-slate-50"
      onClick={() => {
        setOpen(false);
        navigate("/settings");
      }}
    >
      <Cog6ToothIcon className="w-4 h-4 text-slate-500" />
      <span>Settings</span>
    </button>

    <div className="my-1 h-px bg-slate-100" />

    <button
      type="button"
      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 focus:bg-red-50"
      onClick={handleLogout}
    >
      <ArrowRightOnRectangleIcon className="w-4 h-4" />
      <span>Logout</span>
    </button>
  </div>
)}

</div>

        </div>
      </header>

      {/* Bottom mobile nav */}
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
}
