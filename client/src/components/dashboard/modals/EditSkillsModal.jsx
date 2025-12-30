// src/components/dashboard/modals/EditSkillsModal.jsx
import React, { useEffect, useState } from "react";

export default function EditSkillsModal({ open, initial = [], onClose, onSave }) {
  const [value, setValue] = useState(initial?.join(", ") || "");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={() => {
        onClose();
        document.body.style.overflow = "auto";
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[450px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Skills</h2>

        <textarea
          className="w-full border p-2 rounded text-sm"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="React, Node, MongoDB"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm rounded bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(value.split(",").map((x) => x.trim()).filter(Boolean));
              onClose();
              document.body.style.overflow = "auto";
            }}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
