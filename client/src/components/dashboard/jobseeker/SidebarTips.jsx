export default function SidebarTips() {
  return (
    <aside className="hidden lg:block w-64 space-y-4">
      <section className="bg-white rounded-lg border border-slate-200 p-3">
        <h3 className="text-xs font-semibold text-slate-900 mb-2">Profile completeness</h3>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-indigo-500" />
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Complete your about, experience and projects to improve visibility.
        </p>
      </section>

      <section className="bg-white rounded-lg border border-slate-200 p-3">
        <h3 className="text-xs font-semibold text-slate-900 mb-2">Tips for your profile</h3>
        <ul className="space-y-1 text-[11px] text-slate-600">
          <li>Add at least 5 skills relevant to your target roles.</li>
          <li>Highlight impact in your experience descriptions.</li>
          <li>Attach links to your best projects / GitHub.</li>
        </ul>
      </section>
    </aside>
  );
}
