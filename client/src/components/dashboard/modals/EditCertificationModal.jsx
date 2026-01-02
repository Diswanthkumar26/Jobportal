// src/components/dashboard/modals/EditCertificationModal.jsx
import React, { useEffect, useState } from "react";

export default function EditCertificationModal({
  open,
  onClose,
  onSave,
  initialItem,
}) {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");
  const [validity, setValidity] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name || initialItem.title || "");
      setIssuer(initialItem.issuer || initialItem.organization || "");
      setYear(initialItem.year || "");
      setValidity(initialItem.validity || "");
      setDescription(initialItem.description || "");
    } else {
      setName("");
      setIssuer("");
      setYear("");
      setValidity("");
      setDescription("");
    }
    setErrors({});
  }, [initialItem, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Certification name is required";
    if (!issuer.trim()) e.issuer = "Issuing organization is required";
    if (!year.trim()) e.year = "Year is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      name,
      issuer,
      year,
      validity,
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
        <h2 className="text-lg font-semibold mb-4">
          Add / Edit Certification
        </h2>

        <div className="space-y-3">
          <div>
            <input
              className={cls("name")}
              placeholder="Certification name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {err("name")}
          </div>

          <div>
            <input
              className={cls("issuer")}
              placeholder="Issuing organization"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />
            {err("issuer")}
          </div>

          <div>
            <input
              className={cls("year")}
              placeholder="Year (e.g. 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {err("year")}
          </div>

          <input
            className="w-full border p-2 rounded text-sm border-slate-200"
            placeholder="Validity (NA / Lifetime / 2024-2026)"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
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
