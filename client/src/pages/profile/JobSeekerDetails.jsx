import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api"

export default function JobSeekerDetails() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    currentCity: "",
    preferredLocations: "",
    totalExperience: "",
    currentRole: "",
    highestEducation: "",
    keySkills: "",
    currentSalary: "",
    expectedSalary: "",
    workType: "full-time",
    about: "",
    resumeUrl: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.currentCity.trim()) err.currentCity = "Current city is required";
    if (!form.currentRole.trim())
      err.currentRole = "Current / target role is required";
    if (!form.highestEducation.trim())
      err.highestEducation = "Highest education is required";
    if (!form.keySkills.trim()) err.keySkills = "Add at least a few skills";

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

      await api.post("/profile/job-seeker", form);
      toast.success("Profile saved");
      navigate("/home/jobseeker");
    } catch (err) {
      toast.error(err.response?.data || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-slate-200/80 border border-slate-800 rounded-2xl p-6 md:p-8 text-slate-900">
        <h2 className="text-2xl font-semibold mb-2">Job Seeker Details</h2>
        <p className="text-sm text-slate-400 mb-6">
          Tell recruiters more about your background so they can match you with
          the right jobs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.firstName && (
                <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-900">Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-900">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other / Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-900">Date of birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">Current city</label>
              <input
                name="currentCity"
                value={form.currentCity}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.currentCity && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.currentCity}
                </p>
              )}
            </div>
          </div>

          {/* Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">Total experience</label>
              <select
                name="totalExperience"
                value={form.totalExperience}
                onChange={handleChange}
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              >
                <option value="">Fresher / 0 years</option>
                <option value="0-1">0 – 1 year</option>
                <option value="1-3">1 – 3 years</option>
                <option value="3-5">3 – 5 years</option>
                <option value="5-8">5 – 8 years</option>
                <option value="8+">8+ years</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-900">
                Highest education
              </label>
              <input
                name="highestEducation"
                value={form.highestEducation}
                onChange={handleChange}
                placeholder="B.Tech, M.Sc, Diploma, etc."
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.highestEducation && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.highestEducation}
                </p>
              )}
            </div>
          </div>

          {/* Role & skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">
                Current / target role
              </label>
              <input
                name="currentRole"
                value={form.currentRole}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.currentRole && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.currentRole}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-900">Key skills</label>
              <input
                name="keySkills"
                value={form.keySkills}
                onChange={handleChange}
                placeholder="React, Node.js, SQL, Photoshop..."
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
              {errors.keySkills && (
                <p className="text-xs text-red-400 mt-1">{errors.keySkills}</p>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">
                Preferred locations
              </label>
              <input
                name="preferredLocations"
                value={form.preferredLocations}
                onChange={handleChange}
                placeholder="e.g. Chennai, Bangalore (comma separated)"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">Expected salary</label>
              <input
                name="expectedSalary"
                value={form.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. 6 LPA"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div>

          {/* Work type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
      <label className="text-sm text-slate-900">Current salary</label>
      <input
        name="currentSalary"
        value={form.currentSalary}
        onChange={handleChange}
        placeholder="e.g. 4 LPA"
        className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
      />
    </div>
          <div>
            <label className="text-sm text-slate-900">Work type</label>
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              {["full-time", "part-time", "internship", "freelance"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, workType: type })}
                    className={`px-3 py-1 rounded-full border ${
                      form.workType === type
                        ? "bg-indigo-500 border-indigo-500 text-white"
                        : "border-slate-600 text-slate-900"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                )
              )}
            </div>
          </div>

       </div>   

          {/* About & links */}
          {/* <div>
            <label className="text-sm text-slate-900">About you</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={4}
              placeholder="Briefly describe your background and what you are looking for."
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-200 border border-slate-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-900">
                Resume link (optional)
              </label>
              <input
                name="resumeUrl"
                value={form.resumeUrl}
                onChange={handleChange}
                placeholder="Drive / portfolio URL"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900">
                LinkedIn (optional)
              </label>
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="mt-1 w-full h-10 px-3 rounded-lg bg-slate-200 border border-slate-700 text-sm"
              />
            </div>
          </div> */}

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
