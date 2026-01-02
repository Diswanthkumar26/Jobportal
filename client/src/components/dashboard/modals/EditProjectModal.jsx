// src/components/dashboard/modals/EditProjectModal.jsx
import React, { useEffect, useState } from "react";

export default function EditProjectModal({ open, onClose, onSave, initialItem }) {
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name || "");
      setPeriod(initialItem.period || "");
      setDescription(initialItem.description || "");
      setLink(initialItem.link || "");
    } else {
      setName("");
      setPeriod("");
      setDescription("");
      setLink("");
    }
    setErrors({});
  }, [initialItem, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Project name is required";
    if (!period.trim()) e.period = "Year / period is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      name,
      period,
      description,
      link,
    });
    onClose();
  };

  const cls = (f) =>
    `w-full border p-2 rounded text-sm ${
      errors[f] ? "border-red-400" : "border-slate-200"
    }`;

  const err = (f) =>
    errors[f] && (
      <p className="mt-1 text-[11px] text-red-500">{errors[f]}</p>
    );

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[480px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Project</h2>

        <div className="space-y-3">
          <div>
            <input
              className={cls("name")}
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {err("name")}
          </div>

          <div>
            <input
              className={cls("period")}
              placeholder="Period (e.g. 2023)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
            {err("period")}
          </div>

          <textarea
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Link (https://...)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
