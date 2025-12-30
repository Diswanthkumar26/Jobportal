import React from "react";

export default function ExperienceSection({ list = [], onAdd, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Experience</h2>
        <div className="flex gap-3">
          <button onClick={onAdd} className="text-xs text-indigo-600 hover:underline">
            + Add
          </button>
          <button onClick={onEdit} className="text-xs text-indigo-600 hover:underline">
            Edit
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-4">
        {list.length === 0 && (
          <p className="text-xs text-slate-500">No experience added yet.</p>
        )}

        {list.map((exp) => (
          <div key={exp.id} className="text-sm">
            <p className="font-semibold text-slate-900">{exp.role}</p>
            <p className="text-slate-700">{exp.company}</p>
            <p className="text-xs text-slate-500">
              {exp.period} · {exp.location}
            </p>
            {exp.description && (
              <p className="text-xs text-slate-600 mt-1">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
