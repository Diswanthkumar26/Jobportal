// client/src/components/dashboard/jobseeker/SkillsSection.jsx
import React from "react";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function SkillsSection({ skills, onAdd, onEdit, onRemoveItem }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
        <div className="flex items-center gap-2">
          <button
  type="button"
  onClick={onAdd}
  className="inline-flex items-center justify-center rounded-md text-black"
  title="Add"
>
  <PlusIcon className="h-4 w-4" />
</button>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
            title="Edit all"
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <p className="text-xs text-slate-500">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-800"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="text-red-500 hover:text-red-600"
                title="Remove"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
