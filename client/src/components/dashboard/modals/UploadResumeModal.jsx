// src/components/dashboard/modals/UploadResumeModal.jsx
import React, { useState } from "react";
import { uploadResumeFile } from "../../../services/profileApi";

export default function UploadResumeModal({ open, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a file");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadResumeFile(file);
      const { url, name } = res.data; // <- STRING url
      onSave(url, name);              // <- pass string, not whole object
      onClose();
    } catch (err) {
      console.error("Resume upload failed", err.response?.data || err.message);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[420px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>

        <p className="text-xs text-slate-500 mb-2">
          PDF / DOC, max 5MB.
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="w-full text-sm"
        />

        {error && (
          <p className="mt-2 text-[11px] text-red-500">{error}</p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-100"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white disabled:opacity-60"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
