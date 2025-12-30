export default function EducationSection({ list, onAdd, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Education</h2>
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
        {list.map((edu) => (
          <div key={edu.id} className="text-sm">
            <p className="font-semibold text-slate-900">{edu.school}</p>
            <p className="text-slate-700">{edu.degree}</p>
            <p className="text-xs text-slate-500">
              {edu.period} · {edu.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
