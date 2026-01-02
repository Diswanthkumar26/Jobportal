// src/components/dashboard/modals/EditSkillsModal.jsx
import React, { useEffect, useState } from "react";

export default function EditSkillsModal({ open, onClose, onSave, initial }) {
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setSkills(initial || []);
    setInput("");
    setError("");
  }, [initial, open]);

  if (!open) return null;

  const addSkill = () => {
    const v = input.trim();
    if (!v) {
      setError("Skill cannot be empty");
      return;
    }
    if (skills.some((s) => s.toLowerCase() === v.toLowerCase())) {
      setError("Skill already added");
      return;
    }
    setSkills([...skills, v]);
    setInput("");
    setError("");
  };

  const removeSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (skills.length === 0) {
      setError("Add at least one skill");
      return;
    }
    onSave(skills);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[480px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Skills</h2>

        <div className="space-y-3">
          <div>
            <div className="flex gap-2">
              <input
                className={`flex-1 border p-2 rounded text-sm ${
                  error ? "border-red-400" : "border-slate-200"
                }`}
                placeholder="Add a skill and press Enter"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <button
                onClick={addSkill}
                className="px-3 py-2 text-sm rounded bg-indigo-600 text-white"
              >
                Add
              </button>
            </div>
            {error && (
              <p className="mt-1 text-[11px] text-red-500">{error}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-xs text-slate-700"
              >
                {s}
                <button
                  type="button"
                  className="text-slate-500 hover:text-red-500"
                  onClick={() => removeSkill(idx)}
                >
                  ×
                </button>
              </span>
            ))}
            {skills.length === 0 && (
              <p className="text-xs text-slate-500">
                No skills added yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
