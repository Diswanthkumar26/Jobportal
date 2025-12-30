// src/components/dashboard/modals/EditEducationModal.jsx
import React, { useEffect, useState } from "react";

export default function EditEducationModal({ open, onClose, onSave, initial }) {
  const [school, setSchool] = useState(initial?.school || "");
  const [degree, setDegree] = useState(initial?.degree || "");
  const [period, setPeriod] = useState(initial?.period || "");
  const [location, setLocation] = useState(initial?.location || "");

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
        className="bg-white w-[480px] p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Education</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded text-sm" placeholder="School / University" value={school} onChange={(e) => setSchool(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Period" value={period} onChange={(e) => setPeriod(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm bg-gray-100 rounded">
            Cancel
          </button>
          <button onClick={() => { onSave({ id: initial?.id ?? Date.now(), school, degree, period, location }); onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm bg-indigo-600 rounded text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
