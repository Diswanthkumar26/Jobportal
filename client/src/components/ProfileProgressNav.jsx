// src/components/ProfileProgressNav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileProgressNav({ percent = 0, image }) {
  const navigate = useNavigate();

  const radius = 13;          // smaller circle
  const stroke = 2.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      onClick={() => navigate("/dashboard/jobseeker")}
      className="cursor-pointer flex flex-col items-center"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg
          className="w-full h-full rotate-[-90deg]"
          viewBox="0 0 32 32"
        >
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="#22c55e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="transparent"
          />
        </svg>

        {/* avatar image */}
        <img
          src={image || "/default-avatar.jpg"}
          alt="profile"
          className="absolute w-6 h-6 rounded-full object-cover"
        />
      </div>

      <p className="text-[9px] text-green-600 font-semibold mt-0.5 leading-none">
        {percent}%
      </p>
    </div>
  );
}
