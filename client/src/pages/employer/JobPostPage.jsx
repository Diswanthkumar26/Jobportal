// src/pages/employer/JobPostPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function JobPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = !!id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    experience: "",
    jobType: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!editing) return;

    const loadJob = async () => {
      try {
        const res = await api.get("/employer/jobs");
        const job = res.data.find((j) => j.id === Number(id));
        if (job) {
          setForm({
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            salaryRange: job.salaryRange || "",
            experience: job.experience || "",
            jobType: job.jobType || "",
            description: job.description || "",
          });
        } else {
          toast.error("Job not found");
          navigate("/employer/jobs");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load job");
      }
    };

    loadJob();
  }, [editing, id, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.company.trim()) err.company = "Company is required";
    if (!form.location.trim()) err.location = "Location is required";
    if (!form.description.trim()) err.description = "Description is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      setLoading(true);
      if (editing) {
        await api.put(`/employer/jobs/${id}`, form);
        toast.success("Job updated successfully");
      } else {
        await api.post("/employer/jobs", form);
        toast.success("Job posted successfully");
      }
      navigate("/employer/jobs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h1 className="mb-2 text-base font-semibold text-slate-900">
        {editing ? "Edit job" : "Post a new job"}
      </h1>
      <p className="mb-4 text-sm text-slate-500">
        {editing
          ? "Update the details of this job posting."
          : "Fill in the details below to create a new job posting."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-800">Job title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-slate-800">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-500">{errors.company}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-800">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru, Remote"
              className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-slate-800">Salary range</label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={handleChange}
              placeholder="e.g. ₹6 – ₹10 LPA"
              className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-800">Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 0-2 yrs"
              className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-slate-800">Job type</label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
            >
              <option value="">Select</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-800">Job description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Describe responsibilities, requirements, and nice-to-have skills."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/employer/jobs")}
            className="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading
              ? editing
                ? "Saving..."
                : "Posting..."
              : editing
              ? "Save changes"
              : "Post job"}
          </button>
        </div>
      </form>
    </div>
  );
}
