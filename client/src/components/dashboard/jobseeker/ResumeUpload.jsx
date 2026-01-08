// src/components/dashboard/jobseeker/ResumeUpload.jsx
export default function ResumeUpload({ resumeStatus, onUpload }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Upload Resume</h2>
        <span className="text-[11px] text-slate-500">PDF / DOC, max 5MB</span>
      </div>

      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <p className="mt-2 text-xs text-slate-500">
            {resumeStatus}
          </p>
        </div>

        <button
          type="button"
          onClick={onUpload}
          className="px-4 py-2 text-xs font-medium rounded-full bg-indigo-600 text-white"
        >
          Upload Resume
        </button>
      </div>
    </section>
  );
}
