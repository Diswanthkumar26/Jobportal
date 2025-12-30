// src/components/dashboard/modals/EditCertificationModal.jsx
import React, { useEffect, useState } from "react";

export default function EditCertificationModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [issuer, setIssuer] = useState(initial?.issuer || "");
  const [year, setYear] = useState(initial?.year || "");

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
        className="bg-white rounded-lg w-[450px] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Certification</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded text-sm" placeholder="Certification Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Issuer (Coursera)" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Year (2024)" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm bg-gray-100 rounded">
            Cancel
          </button>
          <button onClick={() => { onSave({ id: initial?.id ?? Date.now(), name, issuer, year }); onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm bg-indigo-600 rounded text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
