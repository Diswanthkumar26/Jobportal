
import React, { useEffect, useState } from "react";

export default function EditAboutModal({ open, onClose, onSave, initialValue }) {
  const [value, setValue] = useState("");

  
  useEffect(() => {
    if (open) setValue(initialValue || "");
  }, [open, initialValue]);

  // Lock scroll on open
  // scroll lock + click outside close + sync text
useEffect(() => {
  if (open) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
  return () => (document.body.style.overflow = "auto");
}, [open]);


  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose} // click backdrop closes modal
    >
      <div
        className="bg-white w-[480px] rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-lg font-semibold mb-4">Edit About</h2>

        <textarea
          className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(value);
              onClose();
            }}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
