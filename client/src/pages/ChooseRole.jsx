import React, { useState } from "react";
import { User, Briefcase, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "JOBSEEKER",
      title: "I'm looking for a job",
      description: "Find your dream role and apply to top companies.",
      icon: <User size={40} />,
    },
    {
      id: "EMPLOYER",
      title: "I'm hiring talent",
      description: "Post jobs and find the best candidates.",
      icon: <Briefcase size={40} />,
    },
  ];

  const handleContinue = async () => {
  try {
    const res = await api.put("/users/role", null, {
      params: { role: selectedRole },
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", selectedRole);

    toast.success("Role updated");

    if (selectedRole === "EMPLOYER")
      navigate("/profile/employer");
    else
      navigate("/profile/job-seeker");

  } catch (err) {
    toast.error("Failed to update role");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Join our community
        </h1>
        <p className="text-gray-600">
          Please select how you plan to use the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1
              ${
                selectedRole === role.id
                  ? "border-indigo-600 ring-4 ring-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
          >
            {selectedRole === role.id && (
              <div className="absolute top-4 right-4 text-indigo-600">
                <CheckCircle size={24} />
              </div>
            )}

            <div
              className={`mb-4 inline-block p-3 rounded-lg ${
                selectedRole === role.id
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-500 bg-gray-50"
              }`}
            >
              {role.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {role.title}
            </h3>
            <p className="text-gray-500">{role.description}</p>
          </div>
        ))}
      </div>

      <button
        disabled={!selectedRole}
        onClick={handleContinue}
        className={`mt-10 px-12 py-3 rounded-full font-semibold text-lg transition-all duration-200 
          ${
            selectedRole
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Continue
      </button>
    </div>
  );
};

export default ChooseRole;
