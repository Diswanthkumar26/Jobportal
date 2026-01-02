// src/components/dashboard/jobseeker/ProfileHeader.jsx
import {
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
} from "react-icons/fi";

export default function ProfileHeader({ profile, onEdit }) {
  const completion = 72;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 px-6 py-5 shadow-sm">
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 items-center">
        {/* LEFT: avatar + text */}
        <div className="flex items-center gap-5 min-w-0">
          {/* avatar + completion */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center ring-4 ring-indigo-100">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                    No photo
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <div className="rounded-full bg-white border border-indigo-200 px-3 py-0.5 text-[11px] font-medium text-indigo-700 shadow-sm">
                Profile {completion}%
              </div>
            </div>
          </div>

          {/* name + meta */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-slate-900 truncate">
              {profile.name || "user1"}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 mt-0.5 truncate">
              {profile.headline || "Fullstack Developer"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {profile.company || "Your company"}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-slate-700 border border-slate-100">
                <FiMapPin className="w-3 h-3 text-indigo-500" />
                {profile.location || "Location, India"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-slate-700 border border-slate-100">
                <FiCalendar className="w-3 h-3 text-indigo-500" />
                {profile.experienceText || "0 Year 0 Months"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-slate-700 border border-slate-100">
                ₹ {profile.ctc || "0"} LPA
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: edit + contact column */}
        <div className="flex flex-col items-end justify-center gap-3 text-xs text-slate-700">
          {/* edit icon */}
          <button
            onClick={onEdit}
            className="rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 p-2 text-indigo-600 transition self-end"
            title="Edit profile"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="flex items-center gap-2 justify-end">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                <FiPhone className="w-3 h-3" />
              </span>
              <span className="truncate text-right">
                {profile.phone || "Phone number"}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                <FiMail className="w-3 h-3" />
              </span>
              <span className="truncate text-right">
                {profile.email || "user1@gmail.com"}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                <FiCalendar className="w-3 h-3" />
              </span>
              <span className="truncate text-right">
                {profile.noticePeriod || "15 days or less notice period"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
