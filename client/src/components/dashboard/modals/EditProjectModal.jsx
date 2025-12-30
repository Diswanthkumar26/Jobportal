// src/components/dashboard/modals/EditProjectModal.jsx
import React, { useEffect, useState } from "react";

export default function EditProjectModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [period, setPeriod] = useState(initial?.period || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [link, setLink] = useState(initial?.link || "");

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
        <h2 className="text-lg font-semibold mb-4">Add / Edit Project</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded text-sm" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Period (2023)" value={period} onChange={(e) => setPeriod(e.target.value)} />
          <textarea className="w-full border p-2 rounded text-sm" placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="w-full border p-2 rounded text-sm" placeholder="Link (https://...)" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm rounded bg-gray-100">Cancel</button>
          <button onClick={() => { onSave({ id: initial?.id ?? Date.now(), name, period, description, link }); onClose(); document.body.style.overflow = "auto"; }} className="px-4 py-2 text-sm rounded bg-indigo-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
