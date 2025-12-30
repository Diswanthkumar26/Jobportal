// src/components/dashboard/modals/UploadResumeModal.jsx
import React, { useEffect, useRef } from "react";

export default function UploadResumeModal({ open, onClose, onSave }) {
  const fileRef = useRef();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  if (!open) return null;

  const handleUpload = () => {
    const file = fileRef.current.files?.[0];
    if (file) {
      onSave(file.name);
      onClose();
      document.body.style.overflow = "auto";
    }
  };

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
        className="bg-white rounded-lg w-[360px] p-6 shadow-lg"
      >
        <h2 className="text-base font-semibold mb-3">Upload Resume</h2>

        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="mb-4 text-sm" />

        <div className="flex justify-end gap-3">
          <button onClick={() => { onClose(); document.body.style.overflow = "auto"; }} className="px-3 py-1 bg-gray-100 rounded text-xs">Cancel</button>
          <button onClick={handleUpload} className="px-3 py-1 bg-indigo-600 rounded text-xs text-white">Upload</button>
        </div>
      </div>
    </div>
  );
}
