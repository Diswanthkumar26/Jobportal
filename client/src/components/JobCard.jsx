// src/components/JobCard.jsx
const JobCard = ({ job, onOpen, onSave, isSaved }) => {
  return (
    <article
      onClick={() => onOpen?.(job)}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-semibold text-indigo-600">
            {job.company?.[0] || "C"}
          </div>

          {/* Title + company */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-slate-900">
              {job.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              {job.company} · {job.location}
            </p>
          </div>
        </div>

        {/* Right side: type badge + save icon */}
        <div className="flex items-start gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] md:text-[11px] font-medium text-emerald-700">
            {job.type || "Full-time"}
          </span>

          {/* Save icon (stop click from opening details) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave?.(job);
            }}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5v15l-6-3.5-6 3.5v-15Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] md:text-xs text-slate-500">
        <span>
          ₹{job.salaryMin} - ₹{job.salaryMax} LPA
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span>{job.experience || "0-2 yrs"}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span>Posted {job.postedAgo || "2d ago"}</span>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {(job.skills || []).slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] md:text-[11px] text-slate-700 border border-slate-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
};

export default JobCard;
