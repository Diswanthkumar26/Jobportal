import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditFullProfile() {
  const navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [headline, setHeadline] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const saveProfile = () => {
    // TODO: send to backend later
    alert("Profile saved!");
    navigate("/home/jobseeker");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-lg font-semibold text-slate-900">
            Edit Profile
          </h1>
          <button
            className="text-sm text-indigo-600"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Headline */}
        <section className="bg-white p-4 rounded-lg border">
          <label className="block text-sm font-medium text-slate-800">
            Headline
          </label>
          <input
            className="mt-1 w-full border p-2 rounded-lg bg-slate-50"
            placeholder="Ex: Full Stack Developer"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </section>

        {/* About */}
        <section className="bg-white p-4 rounded-lg border">
          <label className="block text-sm font-medium text-slate-800">
            About You
          </label>
          <textarea
            rows={5}
            className="mt-1 w-full border p-2 rounded-lg bg-slate-50"
            placeholder="Describe your background..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </section>

        {/* Skills */}
        <section className="bg-white p-4 rounded-lg border">
          <label className="block text-sm font-medium text-slate-800">
            Skills
          </label>

          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 border p-2 rounded-lg bg-slate-50"
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              onClick={addSkill}
            >
              + Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-100 rounded-full text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <section className="text-right">
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </section>
      </main>
    </div>
  );
}
