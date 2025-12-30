
const stats = [
  { label: 'Open Jobs', value: 12 },
  { label: 'New Applications Today', value: 27 },
  { label: 'Pending Reviews', value: 9 },
  { label: 'Upcoming Interviews', value: 4 },
];

const tasks = [
  'Review 5 new applications for “Frontend Developer”',
  'Respond to 3 unread candidate messages',
  'Schedule 2 interviews for “Senior Backend Engineer”',
  'Update salary range for “UI/UX Designer” posting',
];

export default function EmployerHome() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top navigation */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-semibold">
            JP
          </span>
          <span className="font-semibold">JobPortal</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-slate-50">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Hiring active
          </button>
          <button className="relative h-9 w-9 rounded-full hover:bg-slate-100 flex items-center justify-center">
            <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-red-500" />
            <span className="i-bell" aria-hidden="true">🔔</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="hidden text-right text-sm md:block">
              <p className="font-medium">Employer</p>
              <p className="text-xs text-slate-500">Employer</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Shell: sidebar + main */}
      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="hidden w-60 border-r bg-white p-4 md:flex md:flex-col">
          <nav className="space-y-1 text-sm">
            <SidebarItem active label="Dashboard" />
            <SidebarItem label="Jobs" />
            <SidebarItem label="Candidates" />
            <SidebarItem label="Messages" />
            <SidebarItem label="Company Profile" />
            <SidebarItem label="Billing" />
            <SidebarItem label="Settings" />
          </nav>

          <div className="mt-auto rounded-lg bg-indigo-50 p-3 text-xs text-slate-700">
            <p className="font-semibold mb-1">Tips</p>
            <p>Boost visibility by sponsoring high-priority roles.</p>
          </div>
        </aside>

        {/* Mobile sidebar placeholder – you can wire this to a drawer later */}
        <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-lg md:hidden hidden">
          {/* Implement mobile drawer if needed */}
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
          {/* Hero + primary actions */}
          <section className="mb-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Employer home</p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Good morning, 
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Here is an overview of your hiring funnel for today.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                  Post a job
                </button>
                <button className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  View candidates
                </button>
              </div>
            </div>
          </section>

          {/* Stats strip */}
          <section className="mb-6">
            <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Main grid: activity + placeholder for future charts/cards */}
          <section className="grid gap-4 lg:grid-cols-3">
            {/* Activity & tasks */}
            <div className="lg:col-span-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-slate-900">
                  Next actions
                </h2>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  View all
                </button>
              </div>

              <ul className="space-y-3">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                  >
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-amber-400" />
                    <div className="text-sm text-slate-700">
                      {task}
                    </div>
                    <button className="ml-auto text-xs font-medium text-indigo-600 hover:text-indigo-700">
                      Open
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column – placeholder for charts / quick view */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-base font-semibold text-slate-900 mb-2">
                  Today&apos;s overview
                </h2>
                <p className="text-sm text-slate-500">
                  Quick snapshot of your pipeline performance. Integrate charts
                  here later (e.g., Chart.js or Recharts).
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Applications this week</p>
                    <p className="mt-1 text-lg font-semibold">138</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Interview rate</p>
                    <p className="mt-1 text-lg font-semibold">32%</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Offer acceptance</p>
                    <p className="mt-1 text-lg font-semibold">78%</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Time to hire</p>
                    <p className="mt-1 text-lg font-semibold">18 days</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-indigo-600 p-4 text-sm text-indigo-50 shadow-sm">
                <p className="font-semibold mb-1">Need more candidates?</p>
                <p className="mb-3">
                  Reach more job seekers by boosting your top 3 roles.
                </p>
                <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50">
                  Explore boosting options
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ label, active }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
        active
          ? 'bg-indigo-50 text-indigo-700 font-medium'
          : 'text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span className="text-sm">{label}</span>
      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
      )}
    </button>
  );
}
