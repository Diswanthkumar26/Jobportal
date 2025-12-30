// SkillsSection.jsx
import { FiPlus, FiEdit2 } from "react-icons/fi";

export default function SkillsSection({ skills, onAdd, onEdit }) {
  const hasData = skills && skills.length > 0;

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-900">Skills</h2>

        <div className="flex items-center gap-3">
          {/* {hasData && (
            <button
              className="p-1 rounded-full hover:bg-slate-100"
              onClick={onEdit}
            >
              <FiEdit2 className="w-4 h-4 text-slate-600" />
            </button>
          )} */}
          <button
            className="p-1 rounded-full hover:bg-slate-100"
            onClick={onAdd}
          >
            <FiPlus className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {hasData ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No skills added yet.</p>
      )}
    </section>
  );
}
