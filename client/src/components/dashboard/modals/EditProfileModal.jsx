import React, { useState, useEffect } from "react";

export default function EditProfileModal({ open, onClose, onSave, initial }) {
  if (!open) return null;

  const [name, setName] = useState(initial?.name || "");
  const [headline, setHeadline] = useState(initial?.headline || "");
  const [location, setLocation] = useState(initial?.location || "");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white w-[480px] rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ name, headline, location });
              onClose();
            }}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
