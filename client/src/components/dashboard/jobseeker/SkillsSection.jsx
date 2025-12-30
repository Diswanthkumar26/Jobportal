export default function SkillsSection({ skills, onAdd, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
        <div className="flex gap-3">
          <button onClick={onAdd} className="text-xs text-indigo-600 hover:underline">+ Add</button>
          <button onClick={onEdit} className="text-xs text-indigo-600 hover:underline">Edit</button>
        </div>
      </div>
      <div className="px-4 py-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-800">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
