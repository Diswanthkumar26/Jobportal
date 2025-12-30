// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import api from "../services/api";

// export default function CompleteProfile() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   const [form, setForm] = useState({
//     skills: "",
//     experience: "",
//     location: "",
//     companyName: "",
//     companyWebsite: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload =
//       role === "CANDIDATE"
//         ? {
//             skills: form.skills,
//             experience: form.experience,
//             location: form.location,
//           }
//         : {
//             companyName: form.companyName,
//             companyWebsite: form.companyWebsite,
//           };

//     try {
//       setLoading(true);

//       await api.put("/auth/complete", payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       toast.success("Profile completed");

//       if (role === "EMPLOYER") navigate("/employer/dashboard");
//       else navigate("/candidate/dashboard");
//     } catch (err) {
//       toast.error("Failed to complete profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-2xl p-10 w-full max-w-lg shadow"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Complete Your Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {role === "CANDIDATE" && (
//             <>
//               <input
//                 name="skills"
//                 placeholder="Skills"
//                 value={form.skills}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 border rounded-lg"
//                 required
//               />
//               <input
//                 name="experience"
//                 placeholder="Experience"
//                 value={form.experience}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 border rounded-lg"
//                 required
//               />
//               <input
//                 name="location"
//                 placeholder="Location"
//                 value={form.location}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 border rounded-lg"
//                 required
//               />
//             </>
//           )}

//           {role === "EMPLOYER" && (
//             <>
//               <input
//                 name="companyName"
//                 placeholder="Company Name"
//                 value={form.companyName}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 border rounded-lg"
//                 required
//               />
//               <input
//                 name="companyWebsite"
//                 placeholder="Company Website"
//                 value={form.companyWebsite}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 border rounded-lg"
//                 required
//               />
//             </>
//           )}

//           <button
//             disabled={loading}
//             className="w-full h-12 bg-indigo-600 text-white rounded-lg font-medium"
//           >
//             {loading ? "Saving..." : "Complete Profile"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }
