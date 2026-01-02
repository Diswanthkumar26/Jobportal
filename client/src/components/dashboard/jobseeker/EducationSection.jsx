// client/src/components/dashboard/jobseeker/EducationSection.jsx
import React from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function EducationSection({ list, onAdd, onEditItem, onRemoveItem }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-900">Education</h2>
          <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-md text-black"
          title="Add"
        >
          <PlusIcon className="h-4 w-4" />
        </button>

      </div>

      <div className="space-y-2">
        {list.length === 0 && (
          <p className="text-xs text-slate-500">No education added yet.</p>
        )}

        {list.map((ed, index) => (
          <div
            key={index}
            className="flex items-start justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {ed.degree}
              </h3>
              <p className="text-xs text-slate-500">
                {ed.school} · {ed.location}
              </p>
              {ed.period && (
                <p className="text-xs text-slate-400">{ed.period}</p>
              )}
              {ed.description && (
                <p className="mt-1 text-xs text-slate-600">
                  {ed.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="inline-flex items-center justify-center rounded-md p-1.5 text-red-500 hover:bg-red-50"
                title="Remove"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onEditItem(index)}
                className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
                title="Edit"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
