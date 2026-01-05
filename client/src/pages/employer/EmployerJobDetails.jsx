// client/src/pages/employer/EmployerJobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function EmployerJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="p-4 text-sm">Loading…</p>;
  if (!job) return <p className="p-4 text-sm text-red-500">Job not found.</p>;

  return (
    <div className="p-4">
      <h1 className="mb-1 text-lg font-semibold">{job.title}</h1>
      <p className="text-sm text-slate-600">
        {job.company} • {job.location}
      </p>

      <div className="mt-4 text-sm">
        <p><span className="font-medium">Salary:</span> {job.salaryRange}</p>
        <p><span className="font-medium">Experience:</span> {job.experience}</p>
        <p><span className="font-medium">Status:</span> {job.status}</p>
      </div>

      <div className="mt-6">
        <h2 className="mb-1 text-sm font-semibold">Job description</h2>
        <p className="whitespace-pre-wrap text-sm">{job.description}</p>
      </div>
    </div>
  );
}
