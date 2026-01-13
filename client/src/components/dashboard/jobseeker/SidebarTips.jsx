// src/components/dashboard/jobseeker/SidebarTips.jsx
import React from "react";

export default function SidebarTips({
  completeness,
  hasBasic,
  hasAbout,
  hasExperience,
  hasProjects,
  hasSkills,
  hasResume,
  hasCertifications,
}) {
  const tips = [];

  if (!hasBasic) tips.push("Fill your basic details (name, headline, location, photo).");
  if (!hasAbout) tips.push("Write a short About summary (2–3 lines).");
  if (!hasExperience) tips.push("Add at least one work experience or internship.");
  if (!hasProjects) tips.push("Add a project that matches your target role.");
  if (!hasSkills) tips.push("Add 5–8 relevant skills to your profile.");
  if (!hasResume) tips.push("Upload your latest resume in PDF or DOC.");
  if (!hasCertifications) tips.push("Add any important certifications you hold.");

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-3">
      <h3 className="text-xs font-semibold text-slate-900 mb-2">
        Next steps ({completeness}%)
      </h3>

      {tips.length === 0 ? (
        <p className="text-[11px] text-green-600">
          Your profile looks strong. Keep applying to suitable jobs.
        </p>
      ) : (
        <ul className="space-y-1">
          {tips.slice(0, 4).map((tip, idx) => (
            <li key={idx} className="text-[11px] text-slate-600">
              • {tip}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
