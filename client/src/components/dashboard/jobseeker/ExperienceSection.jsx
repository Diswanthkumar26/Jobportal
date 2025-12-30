// src/components/dashboard/jobseeker/ExperienceSection.jsx
import { FiPlus, FiEdit2 } from "react-icons/fi";

export default function ExperienceSection({ list, onAdd, onEditItem }) {
  const hasData = list && list.length > 0;

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4 mb-3">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-900">
          Experience
        </h2>

        <div className="flex items-center gap-3">
          {/* Optional global edit icon */}
          {/* {hasData && (
            <button
              className="p-1 rounded-full hover:bg-slate-100"
              onClick={() => onEditItem(0)}
            >
              <FiEdit2 className="w-4 h-4 text-slate-600" />
            </button>
          )} */}

          {/* Add icon */}
          <button
            className="p-1 rounded-full hover:bg-slate-100"
            onClick={onAdd}
          >
            <FiPlus className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* LIST */}
      {hasData ? (
        <div className="divide-y divide-slate-200">
          {list.map((exp, index) => (
            <div key={exp.id ?? index} className="py-3 flex items-start">
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {exp.role}
                </div>
                <div className="text-sm text-slate-700">
                  {exp.company}
                </div>
                <div className="text-xs text-slate-500">
                  {exp.period} · {exp.location}
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  {exp.description}
                </div>
              </div>

              <button
                className="ml-3 mt-1 p-1 rounded-full hover:bg-slate-100"
                onClick={() => onEditItem(index)}
              >
                <FiEdit2 className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No experience added yet.</p>
      )}
    </section>
  );
}
