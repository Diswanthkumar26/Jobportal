import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api"

export default function EmployerDetails() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    companyType: "",
    headOfficeCity: "",
    country: "",
    aboutCompany: "",
    benefits: "",
    contactPersonName: "",
    contactPersonRole: "",
    contactEmail: "",
    contactPhone: "",
    hiringForRoles: "",
    hiringLocations: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.companyName.trim()) err.companyName = "Company name is required";
    if (!form.contactPersonName.trim())
      err.contactPersonName = "Contact person name is required";
    if (!form.contactEmail.trim())
      err.contactEmail = "Contact email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
      err.contactEmail = "Invalid email";
    if (!form.headOfficeCity.trim())
      err.headOfficeCity = "Head office city is required";

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

      await api.post("/profile/employer", form);

      toast.success("Employer profile saved");
      navigate("/employer/home");
    } catch (err) {
      toast.error(err.response?.data || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-4xl bg-slate-200/80 border border-slate-800 rounded-2xl p-6 md:p-8 text-slate-900">
        <h2 className="text-2xl font-semibold mb-2">
          Employer / Company Details
        </h2>
        <p className="text-sm text-slate-900 mb-6">
          Set up your company profile so job seekers can understand your
          organisation and roles.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic company info */}
          <div>
            <label className="text-sm text-slate-900">Company name</label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
            />
            {errors.companyName && (
              <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">Company website</label>
              <input
                name="companyWebsite"
                value={form.companyWebsite}
                onChange={handleChange}
                placeholder="https://example.com"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">Company size</label>
              <select
                name="companySize"
                value={form.companySize}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              >
                <option value="">Select</option>
                <option value="1-10">1 – 10 employees</option>
                <option value="11-50">11 – 50 employees</option>
                <option value="51-200">51 – 200 employees</option>
                <option value="201-500">201 – 500 employees</option>
                <option value="501-1000">501 – 1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
          </div>

          {/* Industry & type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">Industry</label>
              <input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="IT Services, Education, Manufacturing..."
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">Company type</label>
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              >
                <option value="">Select</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="startup">Startup</option>
                <option value="ngo">NGO / Non-profit</option>
                <option value="government">Government</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">Head office city</label>
              <input
                name="headOfficeCity"
                value={form.headOfficeCity}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.headOfficeCity && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.headOfficeCity}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-900">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div>

          {/* About & benefits */}
          {/* <div>
            <label className="text-sm text-slate-900">About the company</label>
            <textarea
              name="aboutCompany"
              value={form.aboutCompany}
              onChange={handleChange}
              rows={4}
              placeholder="Briefly describe your organisation, products/services, and culture."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-200 border border-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-slate-900">
              Key benefits / perks
            </label>
            <textarea
              name="benefits"
              value={form.benefits}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Health insurance, hybrid work, learning budget..."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-200 border border-slate-700 text-sm"
            />
          </div> */}

          {/* Contact person */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">
                Contact person name
              </label>
              <input
                name="contactPersonName"
                value={form.contactPersonName}
                onChange={handleChange}
                placeholder="HR / Recruiter / Founder"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.contactPersonName && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.contactPersonName}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-900">
                Contact person role
              </label>
              <input
                name="contactPersonRole"
                value={form.contactPersonRole}
                onChange={handleChange}
                placeholder="Talent Acquisition, HR Manager, etc."
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">Contact email</label>
              <input
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.contactEmail && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.contactEmail}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-900">Contact phone</label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div>

          {/* Hiring preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">
                Roles you often hire for
              </label>
              <input
                name="hiringForRoles"
                value={form.hiringForRoles}
                onChange={handleChange}
                placeholder="e.g. Frontend, Sales, Customer Support"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">Hiring locations</label>
              <input
                name="hiringLocations"
                value={form.hiringLocations}
                onChange={handleChange}
                placeholder="e.g. Remote, Chennai, Bangalore..."
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full h-11 rounded-lg bg-indigo-600 text-sm font-medium flex items-center justify-center hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
