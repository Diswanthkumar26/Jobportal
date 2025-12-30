import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileProgressNav({ percent = 0, image }) {
  const navigate = useNavigate();

  const radius = 38;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      onClick={() => navigate("/dashboard/jobseeker")}
      className="cursor-pointer flex flex-col items-center"
    >
      {/* Circle + Image */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="transparent"
          />

          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#22c55e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="transparent"
          />
        </svg>

        {/* Profile image */}
        <img
          src={image || "/default-avatar.jpg"}
          alt="profile"
          className="absolute w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Percentage text */}
      <p className="text-xs text-green-600 font-semibold mt-1">
        {percent}%
      </p>
    </div>
  );
}
