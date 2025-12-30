
import React from "react";

export default function AboutSection({ about, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">About</h2>

        <button
          onClick={onEdit}
          className="text-xs text-indigo-600 hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="px-4 py-3">
        <p className="text-sm text-slate-700 whitespace-pre-line">{about}</p>
      </div>
    </section>
  );
}
