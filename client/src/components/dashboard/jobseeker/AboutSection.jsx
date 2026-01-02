// src/components/dashboard/jobseeker/AboutSection.jsx
import { FiEdit2, FiPlus } from "react-icons/fi";

export default function AboutSection({ about, onEdit, onAdd }) {
  const hasData = about && about.trim().length > 0;

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4 mb-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">About</h2>

        {hasData ? (
          <button
            className="p-1 rounded-full hover:bg-slate-100"
            onClick={onEdit}
          >
            <FiEdit2 className="w-4 h-4 text-slate-600" />
          </button>
        ) : (
          <button
            className="p-1 rounded-full hover:bg-slate-100"
            onClick={onAdd}
          >
            <FiPlus className="w-4 h-4 text-slate-600" />
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-700">
        {hasData ? about : "No about info added yet."}
      </p>
    </section>
  );
}
