import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerCompanyProfile() {
  const employerId = Number(localStorage.getItem("userId")) || 1;

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    location: "",
    industry: "",
    description: "",
    size: "",
    foundedYear: "",
    logoUrl: "",
    benefits: "",
    culture: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const loadProfile = async () => {
    try {
      const res = await api.get(`/company/${employerId}`);
      if (res.data) {
        setForm((prev) => ({
          ...prev,
          ...res.data,
        }));
      }
    } catch (err) {
      // no profile yet – ignore
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      await api.post("/company/save", { ...form, employerId });
      toast.success("Company profile saved");
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-lg font-semibold text-slate-900">Company Profile</h1>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Company name */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Company name
          <input
            placeholder="Ex: Acme Technologies"
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.companyName}
            onChange={handleChange("companyName")}
          />
        </label>

        {/* Website */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Website
          <input
            placeholder="https://example.com"
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.website}
            onChange={handleChange("website")}
          />
        </label>

        {/* Location */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Location
          <input
            placeholder="City, Country"
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.location}
            onChange={handleChange("location")}
          />
        </label>

        {/* Industry */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Industry
          <input
            placeholder="IT Services, Fintech, etc."
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.industry}
            onChange={handleChange("industry")}
          />
        </label>

        {/* Company size */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Company size
          <select
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.size}
            onChange={handleChange("size")}
          >
            <option value="">Select size</option>
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="201-500">201–500 employees</option>
            <option value="501-1000">501–1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </label>

        {/* Founded year */}
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Founded year
          <input
            type="number"
            placeholder="2018"
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.foundedYear}
            onChange={handleChange("foundedYear")}
          />
        </label>

        {/* Logo URL */}
        <label className="flex flex-col text-sm font-medium text-slate-700 sm:col-span-2">
          Logo URL
          <input
            placeholder="https://cdn.example.com/logo.png"
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.logoUrl}
            onChange={handleChange("logoUrl")}
          />
        </label>

        {/* Description */}
        <label className="flex flex-col text-sm font-medium text-slate-700 sm:col-span-2">
          Company description
          <textarea
            placeholder="Short overview of what your company does…"
            rows={3}
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.description}
            onChange={handleChange("description")}
          />
        </label>

        {/* Benefits */}
        <label className="flex flex-col text-sm font-medium text-slate-700 sm:col-span-2">
          Benefits
          <textarea
            placeholder="Health insurance, flexible hours, learning budget, etc."
            rows={2}
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.benefits}
            onChange={handleChange("benefits")}
          />
        </label>

        {/* Culture / mission */}
        <label className="flex flex-col text-sm font-medium text-slate-700 sm:col-span-2">
          Culture & mission
          <textarea
            placeholder="What is it like to work at your company? What is your mission?"
            rows={3}
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.culture}
            onChange={handleChange("culture")}
          />
        </label>
      </div>

      <button
        onClick={saveProfile}
        disabled={saving}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
