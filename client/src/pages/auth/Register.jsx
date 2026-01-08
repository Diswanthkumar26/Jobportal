import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AuthAbout from "../../components/AuthAbout";
import api from "../../services/api";

import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    password: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const dialCode = `+${getCountryCallingCode(country)}`;
    setForm((prev) => ({ ...prev, countryCode: dialCode }));
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "Invalid phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email";
    if (strength < 3) err.password = "Password is too weak";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Fix the errors");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
  ...form,
  phone: `${form.countryCode}${form.phone}`,
});

// backend now returns LoginResponse
const {
  token,
  role,
  profileCompleted,
  email,
  userId,
} = res.data;

localStorage.setItem("token", token);
localStorage.setItem("role", role);
localStorage.setItem("profileCompleted", String(profileCompleted));

if (email) {
  localStorage.setItem("email", email.trim().toLowerCase());
}

if (userId != null) {
  localStorage.setItem("userId", String(userId));
}

toast.success("Registration successful");
navigate("/choose-role");
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1545235617-9465d2a55698')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 border rounded-lg"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

            <div className="flex gap-3">
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="h-12 px-3 border rounded-lg"
              >
                {getCountries().map((c) => (
                  <option key={c} value={c}>
                    {c} +{getCountryCallingCode(c)}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 012 5.18 2 2 0 014.11 3h3a2 2 0 012 1.72c.12.81.32 1.6.59 2.36a2 2 0 01-.45 2L8.09 10.91a16 16 0 006 6l1.83-1.83a2 2 0 012-.45c.76.27 1.55.47 2.36.59A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <input
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full h-12 pl-11 pr-4 border rounded-lg"
                />
              </div>
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <input
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 border rounded-lg"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 118 0v4" />
                </svg>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-12 border rounded-lg"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {showPassword ? (
                    <>
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a3 3 0 004.2 4.2" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>


            {form.password && (
              <div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      strength <= 1 ? "bg-red-500" :
                      strength <= 3 ? "bg-yellow-500" :
                      "bg-green-500"
                    }`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

            <button
              disabled={loading}
              className="w-full h-12 bg-indigo-600 text-white rounded-lg font-medium"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Already have an account?
            <Link to="/login" className="text-indigo-600 ml-1 font-medium">
              Login
            </Link>
          </p>
        </motion.div>

        <AuthAbout />
      </div>
    </div>
  );
}
