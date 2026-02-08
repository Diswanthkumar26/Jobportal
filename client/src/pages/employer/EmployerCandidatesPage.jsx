import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerCompanyProfile() {
  const employerId = Number(localStorage.getItem("userId")) || 1;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    location: "",
    industry: "",
    description: "",
  });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/company/${employerId}`);
      if (res.data) {
        setForm(res.data);
      }
    } catch (err) {
      console.log("No company profile yet");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      await api.post("/company/save", {
        ...form,
        employerId,
      });
      toast.success("Company profile saved");
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-lg font-semibold text-slate-900">
        Company Profile
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your company information visible to candidates
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Company name"
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <input
          name="industry"
          value={form.industry}
          onChange={handleChange}
          placeholder="Industry"
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Company description"
          rows={4}
          className="sm:col-span-2 rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={saveProfile}
        disabled={loading}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}
