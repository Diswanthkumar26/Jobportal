export default function ProfileHeader({ profile, onEdit }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-4 flex">
        <div className="w-20 h-20 rounded-full border overflow-hidden bg-slate-200">
          <img src={profile.photoUrl} className="w-full h-full object-cover" />
        </div>

        <div className="ml-4 flex-1">
          <h1 className="text-lg font-semibold text-slate-900">
            {profile.name}
          </h1>
          <p className="text-sm text-slate-600">{profile.headline}</p>
          <p className="text-xs text-slate-500 mt-1">{profile.location}</p>
        </div>

        <button
  onClick={onEdit}
  className="ml-2 h-8 px-3 text-xs rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
>
  Edit profile
</button>

      </div>
    </section>
  );
}
