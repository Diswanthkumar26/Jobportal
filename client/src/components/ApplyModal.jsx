import React, { useState } from "react";

const ApplyModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    const application = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name,
      email,
      resumeUrl,
      note,
      createdAt: new Date().toISOString(),
    };

    onSubmit(application);
    setSubmitting(false);
    setName("");
    setEmail("");
    setResumeUrl("");
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm md:text-base font-semibold text-slate-900">
            Apply for {job.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          {job.company} · {job.location}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Full name *
            </label>
            <input
              className="w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              className="w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Resume link (Drive / URL)
            </label>
            <input
              className="w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Note to recruiter
            </label>
            <textarea
              rows={3}
              className="w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 text-xs font-medium rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
