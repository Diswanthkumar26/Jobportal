// src/pages/dashboard/JobSeekerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  updateJobSeekerResume,
} from "../../services/profileApi";

import ProfileHeader from "../../components/dashboard/jobseeker/ProfileHeader";
import ResumeUpload from "../../components/dashboard/jobseeker/ResumeUpload";
import AboutSection from "../../components/dashboard/jobseeker/AboutSection";
import SkillsSection from "../../components/dashboard/jobseeker/SkillsSection";
import ExperienceSection from "../../components/dashboard/jobseeker/ExperienceSection";
import ProjectsSection from "../../components/dashboard/jobseeker/ProjectsSection";
import EducationSection from "../../components/dashboard/jobseeker/EducationSection";
import CertificationsSection from "../../components/dashboard/jobseeker/CertificationsSection";

import EditProfileModal from "../../components/dashboard/modals/EditProfileModal";
import EditAboutModal from "../../components/dashboard/modals/EditAboutModal";
import EditExperienceModal from "../../components/dashboard/modals/EditExperienceModal";
import EditProjectModal from "../../components/dashboard/modals/EditProjectModal";
import EditSkillsModal from "../../components/dashboard/modals/EditSkillsModal";
import EditEducationModal from "../../components/dashboard/modals/EditEducationModal";
import EditCertificationModal from "../../components/dashboard/modals/EditCertificationModal";
import UploadResumeModal from "../../components/dashboard/modals/UploadResumeModal";

import Navbar from "../../components/common/Navbar";

export default function JobSeekerDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    location: "",
    photoUrl: "",
    company: "",
    experienceText: "",
    ctc: "",
    phone: "",
    email: "",
    noticePeriod: "",
  });

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // resume
  const [resumeStatus, setResumeStatus] = useState("No resume uploaded");
  const [resumeUrl, setResumeUrl] = useState(null);
  const [openResumeModal, setOpenResumeModal] = useState(false);

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [openCertModal, setOpenCertModal] = useState(false);

  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingEduIndex, setEditingEduIndex] = useState(null);
  const [editingCertIndex, setEditingCertIndex] = useState(null);

  const openModal = (setter) => setter(true);
  const closeModal = (setter) => setter(false);

  const userId = localStorage.getItem("userId");
  console.log("userId in dashboard", userId);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getJobSeekerProfile();
      const p = res.data;
      const u = p.user || {};
      console.log("jobseeker profile from API", p);

      const mappedProfile = {
        name: `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim(),
        headline: p.currentRole || "",
        location: p.currentCity || "",
        photoUrl: u.photoUrl || "",
        company: "Your company",
        experienceText: p.totalExperience || "",
        ctc: p.expectedSalary || "",
        phone: p.phone || u.phone || "",
        email: u.email || "",
        noticePeriod: p.noticePeriod || "",
      };
      setProfile(mappedProfile);

      setAbout(p.about || u.about || "");

      if (p.skills) {
        setSkills(
          p.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        );
      } else if (Array.isArray(u.skills)) {
        setSkills(u.skills);
      } else {
        setSkills([]);
      }

      if (p.experiencesJson) {
        setExperience(JSON.parse(p.experiencesJson));
      } else if (Array.isArray(u.experiences)) {
        setExperience(u.experiences);
      } else {
        setExperience([]);
      }

      if (p.projectsJson) {
        setProjects(JSON.parse(p.projectsJson));
      } else if (Array.isArray(u.projects)) {
        setProjects(u.projects);
      } else {
        setProjects([]);
      }

      if (p.educationJson) {
        setEducation(JSON.parse(p.educationJson));
      } else if (Array.isArray(u.education)) {
        setEducation(u.education);
      } else {
        setEducation([]);
      }

      if (p.certificationsJson) {
        setCertifications(JSON.parse(p.certificationsJson));
      } else if (Array.isArray(u.certifications)) {
        setCertifications(u.certifications);
      } else {
        setCertifications([]);
      }

      // ------- resume fields -------
      const ru = p.resumeUrl || p.resume_url || null;
      setResumeUrl(ru);

      if (p.resumeFileName || p.resume_file_name) {
        setResumeStatus(p.resumeFileName || p.resume_file_name);
      } else if (ru) {
        setResumeStatus("Uploaded");
      } else {
        setResumeStatus("No resume uploaded");
      }
      // ------------------------------
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendUpdate = async (patch) => {
    if (!userId) return;
    console.log("PATCH to /api/profile/job-seeker:", JSON.stringify(patch));
    try {
      await updateJobSeekerProfile(patch);
      await loadProfile();
    } catch (err) {
      console.error("Update failed", err.response?.status, err.response?.data);
      alert(
        "Update failed: " +
          (typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data || {}))
      );
    }
  };

  const sendResumeUpdate = async (patch) => {
    try {
      console.log("PATCH to /profile/job-seeker/resume:", patch);
      await updateJobSeekerResume(patch);
      await loadProfile();
    } catch (err) {
      console.error("Update failed", err.response?.status, err.response?.data);
      alert(
        "Update failed: " +
          (typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data || {}))
      );
    }
  };

  const handleRemoveExperience = async (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
    await sendUpdate({ experiences: updated });
  };

  const handleRemoveProject = async (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    await sendUpdate({ projects: updated });
  };

  const handleRemoveEducation = async (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    await sendUpdate({ education: updated });
  };

  const handleRemoveCertification = async (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    await sendUpdate({ certifications: updated });
  };

  const handleRemoveSkill = async (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    await sendUpdate({ skills: updated });
  };

  if (!userId) {
    return (
      <div className="p-6 text-center text-sm text-red-500">
        No userId in localStorage. Ensure you call /users/me after login and
        store userId.
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <Navbar profile={profile} />

      <main className="max-w-6xl mx-auto px-2 md:px-4 py-4 md:py-6 flex gap-4">
        <div className="flex-1 space-y-4">
          <ProfileHeader
            profile={profile}
            onEdit={() => openModal(setOpenProfileModal)}
          />

          <ResumeUpload
            resumeStatus={resumeStatus}
            onUpload={() => setOpenResumeModal(true)}
          />

          <AboutSection
            about={about}
            onEdit={() => openModal(setOpenAboutModal)}
            onAdd={() => openModal(setOpenAboutModal)}
          />

          <ExperienceSection
            list={experience}
            onAdd={() => {
              setEditingExpIndex(null);
              openModal(setOpenExperienceModal);
            }}
            onEditItem={(index) => {
              setEditingExpIndex(index);
              openModal(setOpenExperienceModal);
            }}
            onRemoveItem={handleRemoveExperience}
          />

          <ProjectsSection
            list={projects}
            onAdd={() => {
              setEditingProjectIndex(null);
              openModal(setOpenProjectModal);
            }}
            onEditItem={(index) => {
              setEditingProjectIndex(index);
              openModal(setOpenProjectModal);
            }}
            onRemoveItem={handleRemoveProject}
          />

          <SkillsSection
            skills={skills}
            onAdd={() => openModal(setOpenSkillsModal)}
            onEdit={() => openModal(setOpenSkillsModal)}
            onRemoveItem={handleRemoveSkill}
          />

          <EducationSection
            list={education}
            onAdd={() => {
              setEditingEduIndex(null);
              setOpenEducationModal(true);
            }}
            onEditItem={(idx) => {
              setEditingEduIndex(idx);
              setOpenEducationModal(true);
            }}
            onRemoveItem={handleRemoveEducation}
          />

          <CertificationsSection
            list={certifications}
            onAdd={() => {
              setEditingCertIndex(null);
              openModal(setOpenCertModal);
            }}
            onEditItem={(index) => {
              setEditingCertIndex(index);
              openModal(setOpenCertModal);
            }}
            onRemoveItem={handleRemoveCertification}
          />
        </div>

        <aside className="hidden lg:block w-64 space-y-4">
          <section className="bg-white rounded-lg border border-slate-200 p-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-2">
              Profile completeness
            </h3>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-indigo-500" />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Complete your About, Experience & Projects.
            </p>
          </section>
        </aside>
      </main>

      {/* MODALS */}
      <EditProfileModal
        open={openProfileModal}
        initial={profile}
        onClose={() => closeModal(setOpenProfileModal)}
        onChangePhoto={(file) => {
          console.log("new photo file", file);
        }}
        onDeletePhoto={() => {
          setProfile((prev) => ({ ...prev, photoUrl: null }));
          sendUpdate({ photoUrl: null });
        }}
        onSave={async (data) => {
          setProfile((prev) => ({ ...prev, ...data }));

          const patch = {
            headline: data.headline,
            location: data.location,
            photoUrl: data.photoUrl,
          };

          await sendUpdate(patch);
        }}
      />

      <EditAboutModal
        open={openAboutModal}
        initialValue={about}
        onClose={() => closeModal(setOpenAboutModal)}
        onSave={async (val) => {
          await sendUpdate({ about: val });
        }}
      />

      <EditExperienceModal
        open={openExperienceModal}
        initialItem={
          editingExpIndex !== null ? experience[editingExpIndex] : null
        }
        onClose={() => closeModal(setOpenExperienceModal)}
        onSave={async (item) => {
          let updated;
          if (editingExpIndex === null) {
            updated = [...experience, item];
          } else {
            updated = experience.map((exp, idx) =>
              idx === editingExpIndex ? { ...exp, ...item } : exp
            );
          }
          setExperience(updated);
          await sendUpdate({ experiences: updated });
        }}
      />

      <EditProjectModal
        open={openProjectModal}
        initialItem={
          editingProjectIndex !== null ? projects[editingProjectIndex] : null
        }
        onClose={() => closeModal(setOpenProjectModal)}
        onSave={async (item) => {
          let updated;
          if (editingProjectIndex === null) {
            updated = [...projects, item];
          } else {
            updated = projects.map((p, idx) =>
              idx === editingProjectIndex ? { ...p, ...item } : p
            );
          }
          setProjects(updated);
          await sendUpdate({ projects: updated });
        }}
      />

      <EditSkillsModal
        open={openSkillsModal}
        initial={skills}
        onClose={() => closeModal(setOpenSkillsModal)}
        onSave={async (items) => {
          setSkills(items);
          await sendUpdate({ skills: items });
        }}
      />

      <EditEducationModal
        open={openEducationModal}
        initialItem={
          editingEduIndex !== null ? education[editingEduIndex] : null
        }
        onClose={() => setOpenEducationModal(false)}
        onSave={async (item) => {
          let updated;
          if (editingEduIndex === null) {
            updated = [...education, item];
          } else {
            updated = education.map((ed, idx) =>
              idx === editingEduIndex ? { ...ed, ...item } : ed
            );
          }
          setEducation(updated);
          await sendUpdate({ education: updated });
        }}
      />

      <EditCertificationModal
        open={openCertModal}
        initialItem={
          editingCertIndex !== null ? certifications[editingCertIndex] : null
        }
        onClose={() => closeModal(setOpenCertModal)}
        onSave={async (item) => {
          let updated;
          if (editingCertIndex === null) {
            updated = [...certifications, item];
          } else {
            updated = certifications.map((c, idx) =>
              idx === editingCertIndex ? { ...c, ...item } : c
            );
          }
          setCertifications(updated);
          await sendUpdate({ certifications: updated });
        }}
      />

      <UploadResumeModal
  open={openResumeModal}
  onClose={() => setOpenResumeModal(false)}
  onSave={async (fileUrl, fileName) => {
    setResumeUrl(fileUrl);
    setResumeStatus(fileName || "Uploaded");
    await sendResumeUpdate({
      resumeUrl: fileUrl,
      resumeFileName: fileName,
    });
  }}
/>

    </div>
  );
}
