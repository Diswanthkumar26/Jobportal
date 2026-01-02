// src/components/dashboard/modals/EditAboutModal.jsx
import React, { useEffect, useState } from "react";

export default function EditAboutModal({ open, onClose, onSave, initialValue }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(initialValue || "");
    setError("");
  }, [initialValue, open]);

  if (!open) return null;

  const handleSave = () => {
    const v = value.trim();
    if (!v) {
      setError("About section cannot be empty");
      return;
    }
    if (v.length < 20) {
      setError("Write at least 20 characters");
      return;
    }
    onSave(v);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[520px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Edit About</h2>

        <textarea
          className={`w-full border p-2 rounded text-sm min-h-[140px] ${
            error ? "border-red-400" : "border-slate-200"
          }`}
          placeholder="Describe your experience, skills and what kind of roles you are looking for."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {error && (
          <p className="mt-1 text-[11px] text-red-500">{error}</p>
        )}

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
