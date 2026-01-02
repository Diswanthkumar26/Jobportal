// src/components/dashboard/modals/EditEducationModal.jsx
import React, { useEffect, useState } from "react";

export default function EditEducationModal({ open, onClose, onSave, initialItem }) {
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialItem) {
      setDegree(initialItem.degree || "");
      setSchool(initialItem.school || "");
      setPeriod(initialItem.period || "");
      setLocation(initialItem.location || "");
      setDescription(initialItem.description || "");
    } else {
      setDegree("");
      setSchool("");
      setPeriod("");
      setLocation("");
      setDescription("");
    }
    setErrors({});
  }, [initialItem, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!degree.trim()) e.degree = "Degree is required";
    if (!school.trim()) e.school = "College / University is required";
    if (!period.trim()) e.period = "Period is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      degree,
      school,
      period,
      location,
      description,
    });
    onClose();
  };

  const cls = (f) =>
    `w-full border p-2 rounded text-sm ${
      errors[f] ? "border-red-400" : "border-slate-200"
    }`;

  const err = (f) =>
    errors[f] && (
      <p className="mt-1 text-[11px] text-red-500">{errors[f]}</p>
    );

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[480px] p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Add / Edit Education</h2>

        <div className="space-y-3">
          <div>
            <input
              className={cls("degree")}
              placeholder="Degree (BCA)"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            {err("degree")}
          </div>

          <div>
            <input
              className={cls("school")}
              placeholder="College / University"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            {err("school")}
          </div>

          <div>
            <input
              className={cls("period")}
              placeholder="Period (2021 - 2024)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
            {err("period")}
          </div>

          <input
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
