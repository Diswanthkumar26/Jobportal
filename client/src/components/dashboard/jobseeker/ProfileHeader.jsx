import { FiEdit2, FiMapPin, FiPhone, FiMail, FiCalendar } from "react-icons/fi";

export default function ProfileHeader({ profile, onEdit }) {
  const safePhoto =
    profile.photoUrl && !profile.photoUrl.startsWith("blob:")
      ? profile.photoUrl
      : "/default-avatar.jpg";

  console.log("HEADER safePhoto", safePhoto);
  console.log("HEADER profile", profile);

  const formatLpa = (val) => {
  if (!val) return null;
  const num = Number(val);
  if (isNaN(num)) return val;        // fallback
  return `${num} LPA`;
};

const currentCtcText = formatLpa(profile.currentCtc);
const expectedCtcText = formatLpa(profile.ctc);


  return (
    <section className="bg-white rounded-2xl border border-slate-200 px-6 py-5 shadow-sm">
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 items-center">
        <div className="flex items-center gap-5 min-w-0">
          {/* AVATAR */}
          <div className="relative shrink-0">
            <img
              src={safePhoto}
              alt="Profile"
              style={{
                width: "96px",
                height: "96px",
                display: "block",
                borderRadius: "50%",
                border: "2px solid red",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>

          {/* LEFT: text */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-slate-900 truncate">
              {profile.name || "User"}
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

             {currentCtcText && (
  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-slate-700 border border-slate-100">
    ₹ {currentCtcText} current
  </span>
)}

{expectedCtcText && (
  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-slate-700 border border-slate-100">
    ₹ {expectedCtcText} expected
  </span>
)}
            </div>
          </div>
        </div>

        {/* RIGHT: edit + contact column */}
        <div className="flex flex-col items-end justify-center gap-3 text-xs text-slate-700">
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
