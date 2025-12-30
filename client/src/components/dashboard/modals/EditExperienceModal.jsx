// src/components/dashboard/modals/EditExperienceModal.jsx
import React, { useEffect, useState } from "react";

export default function EditExperienceModal({ open, onClose, onSave, initial }) {
  const [role, setRole] = useState(initial?.role || "");
  const [company, setCompany] = useState(initial?.company || "");
  const [period, setPeriod] = useState(initial?.period || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [description, setDescription] = useState(initial?.description || "");

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
        className="bg-white rounded-lg w-[480px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Experience</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded text-sm" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Period (2023-2024)" value={period} onChange={(e) => setPeriod(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <textarea className="w-full border p-2 rounded text-sm" placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm rounded bg-gray-100">Cancel</button>
          <button
            onClick={() => {
              onSave({ id: initial?.id ?? Date.now(), role, company, period, location, description });
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
