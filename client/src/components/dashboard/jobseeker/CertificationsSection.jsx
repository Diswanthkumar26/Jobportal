export default function CertificationsSection({ list, onAdd, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200 mb-6">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">
          Licenses & Certifications
        </h2>
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
        {list.map((cert) => (
          <div key={cert.id} className="text-sm">
            <p className="font-semibold text-slate-900">{cert.name}</p>
            <p className="text-xs text-slate-600">
              {cert.issuer} · {cert.year}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
