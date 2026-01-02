// src/components/dashboard/modals/EditExperienceModal.jsx
import React, { useEffect, useState } from "react";

export default function EditExperienceModal({ open, onClose, onSave, initialItem }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialItem) {
      setTitle(initialItem.title || "");
      setCompany(initialItem.company || "");
      setLocation(initialItem.location || "");
      setStartDate(initialItem.startDate || "");
      setEndDate(initialItem.endDate || "");
      setCurrent(Boolean(initialItem.current));
      setDescription(initialItem.description || "");
    } else {
      setTitle("");
      setCompany("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setCurrent(false);
      setDescription("");
    }
    setErrors({});
  }, [initialItem, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!company.trim()) e.company = "Company is required";
    if (!startDate.trim()) e.startDate = "Start date is required";
    if (!current && !endDate.trim()) e.endDate = "End date or current job is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      title,
      company,
      location,
      startDate,
      endDate: current ? "" : endDate,
      current,
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
        <h2 className="text-lg font-semibold mb-4">Add / Edit Experience</h2>

        <div className="space-y-3">
          <div>
            <input
              className={cls("title")}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {err("title")}
          </div>

          <div>
            <input
              className={cls("company")}
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            {err("company")}
          </div>

          <input
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <input
                className={cls("startDate")}
                placeholder="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {err("startDate")}
            </div>
            <div className="flex-1">
              <input
                className={cls("endDate")}
                placeholder="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={current}
              />
              {err("endDate")}
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
            Currently working here
          </label>

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
