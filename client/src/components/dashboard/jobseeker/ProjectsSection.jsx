export default function ProjectsSection({ list, onAdd, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Projects</h2>
        <div className="flex gap-3">
          <button onClick={onAdd} className="text-xs text-indigo-600 hover:underline">
            + Add
          </button>
          <button onClick={onEdit} className="text-xs text-indigo-600 hover:underline">
            Edit
          </button>
        </div>
      </div>
      <div className="px-4 py-3 space-y-4">
        {list.map((proj) => (
          <div key={proj.id} className="text-sm">
            <p className="font-semibold text-slate-900">
              {proj.name}{" "}
              {proj.period && (
                <span className="text-xs font-normal text-slate-500">
                  · {proj.period}
                </span>
              )}
            </p>
            {proj.description && (
              <p className="text-xs text-slate-600 mt-1">
                {proj.description}
              </p>
            )}
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 hover:underline"
              >
                View project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
