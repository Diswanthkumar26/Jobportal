// src/components/dashboard/modals/EditExperienceModal.jsx
import React, { useEffect, useState } from "react";

export default function EditExperienceModal({ open, onClose, onSave, initialItem }) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Sync local state when modal opens or initialItem changes
  useEffect(() => {
    if (initialItem) {
      setRole(initialItem.role || "");
      setCompany(initialItem.company || "");
      setPeriod(initialItem.period || "");
      setLocation(initialItem.location || "");
      setDescription(initialItem.description || "");
    } else {
      setRole("");
      setCompany("");
      setPeriod("");
      setLocation("");
      setDescription("");
    }
  }, [initialItem, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    onSave({
      id: initialItem?.id ?? Date.now(),
      role,
      company,
      period,
      location,
      description,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[480px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Experience</h2>

        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="Period (2023-2024)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            className="w-full border p-2 rounded text-sm"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
