// client/src/components/dashboard/modals/UploadResumeModal.jsx
import React, { useState } from "react";
import {
  uploadResumeFile,
  deleteJobSeekerResume,
} from "../../../services/profileApi";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function UploadResumeModal({
  open,
  onClose,
  onSave,
  currentResume,           // { fileName, url } or null
}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
      const { url, name } = res.data;
      await onSave(url, name);      // parent updates profile / auto-apply
      onClose();
    } catch (err) {
      console.error("Resume upload failed", err.response?.data || err.message);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentResume) return;
    if (!window.confirm("Delete current resume?")) return;

    setDeleting(true);
    try {
      await deleteJobSeekerResume();
      toast.success("Resume deleted");
      await onSave(null, null);     // parent clears resume
    } catch (err) {
      console.error("Delete resume failed", err.response?.data || err.message);
      toast.error("Failed to delete resume");
    } finally {
      setDeleting(false);
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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Upload Resume</h2>

          {currentResume?.fileName && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="p-1 rounded hover:bg-red-50 text-red-500 disabled:opacity-50"
              title="Delete resume"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {currentResume?.fileName && (
          <p className="text-[11px] text-slate-500 mb-2 truncate">
            Current: {currentResume.fileName}
          </p>
        )}

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
            disabled={uploading || deleting}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white disabled:opacity-60"
            disabled={uploading || deleting}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
