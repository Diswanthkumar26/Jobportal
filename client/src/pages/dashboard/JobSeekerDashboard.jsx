import React, { useState, useEffect } from "react";
import {
  getJobSeekerProfile,
  updateJobSeekerProfile,
} from "../../services/profileApi";
import { useNavigate } from "react-router-dom";

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

export default function JobSeekerDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", headline: "", location: "", photoUrl: "" });

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumeStatus, setResumeStatus] = useState("No resume uploaded");
  const [resumeUrl, setResumeUrl] = useState(null);

  // Modals
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [openCertModal, setOpenCertModal] = useState(false);
  const [openResumeModal, setOpenResumeModal] = useState(false);

  const lockBodyScroll = (lock) => (document.body.style.overflow = lock ? "hidden" : "auto");
  const openModal = (setter) => { setter(true); lockBodyScroll(true); };
  const closeModal = (setter) => { setter(false); lockBodyScroll(false); };

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await getJobSeekerProfile();
      const u = res.data;

      setProfile({ name: u.name, headline: u.headline, location: u.location, photoUrl: u.photoUrl });
      setAbout(u.about);
      setSkills(u.skills || []);
      setExperience(u.experiences || []);
      setProjects(u.projects || []);
      setEducation(u.education || []);
      setCertifications(u.certifications || []);
      setResumeUrl(u.resumeUrl);
      setResumeStatus(u.resumeUrl ? "Uploaded" : "No resume uploaded");
    } finally {
      setLoading(false);
    }
  }

  const sendUpdate = async (patch) => {
  try {
    await updateJobSeekerProfile(patch);
    await loadProfile();   // refresh UI
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};


  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">JobPortal</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button className="text-slate-600 hover:text-indigo-600" onClick={() => navigate("/home/jobseeker")}>Home</button>
            <button className="text-slate-600 hover:text-indigo-600" onClick={() => navigate("/jobs")}>Find Jobs</button>
          </nav>

          <img src={profile.photoUrl} className="w-9 h-9 rounded-full object-cover" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-2 md:px-4 py-4 md:py-6 flex gap-4">
        <div className="flex-1 space-y-4">
          <ProfileHeader profile={profile} onEdit={() => openModal(setOpenProfileModal)} />
          <ResumeUpload resumeStatus={resumeStatus} onOpen={() => openModal(setOpenResumeModal)} />
          <AboutSection about={about} onEdit={() => openModal(setOpenAboutModal)} />
          <ExperienceSection list={experience} onAdd={() => openModal(setOpenExperienceModal)} onEdit={() => openModal(setOpenExperienceModal)} />
          <ProjectsSection list={projects} onAdd={() => openModal(setOpenProjectModal)} onEdit={() => openModal(setOpenProjectModal)} />
          <SkillsSection skills={skills} onAdd={() => openModal(setOpenSkillsModal)} onEdit={() => openModal(setOpenSkillsModal)} />
          <EducationSection list={education} onAdd={() => openModal(setOpenEducationModal)} onEdit={() => openModal(setOpenEducationModal)} />
          <CertificationsSection list={certifications} onAdd={() => openModal(setOpenCertModal)} onEdit={() => openModal(setOpenCertModal)} />
        </div>

        <aside className="hidden lg:block w-64 space-y-4">
          <section className="bg-white rounded-lg border border-slate-200 p-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-2">Profile completeness</h3>
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
      <EditProfileModal open={openProfileModal} initial={profile} onClose={() => closeModal(setOpenProfileModal)} onSave={async (data) => { await sendUpdate(data); }} />
      <EditAboutModal open={openAboutModal} initialValue={about} onClose={() => closeModal(setOpenAboutModal)} onSave={async (val) => { await sendUpdate({ about: val }); }} />
      <EditExperienceModal open={openExperienceModal} onClose={() => closeModal(setOpenExperienceModal)} onSave={async (item) => { await sendUpdate({ experiences: [...experience, item] }); }} />
      <EditProjectModal open={openProjectModal} onClose={() => closeModal(setOpenProjectModal)} onSave={async (item) => { await sendUpdate({ projects: [...projects, item] }); }} />
      <EditSkillsModal open={openSkillsModal} initial={skills} onClose={() => closeModal(setOpenSkillsModal)} onSave={async (items) => { await sendUpdate({ skills: items }); }} />
      <EditEducationModal open={openEducationModal} onClose={() => closeModal(setOpenEducationModal)} onSave={async (item) => { await sendUpdate({ education: [...education, item] }); }} />
      <EditCertificationModal open={openCertModal} onClose={() => closeModal(setOpenCertModal)} onSave={async (item) => { await sendUpdate({ certifications: [...certifications, item] }); }} />
      <UploadResumeModal open={openResumeModal} onClose={() => closeModal(setOpenResumeModal)} onSave={async (fileUrl) => { await sendUpdate({ resumeUrl: fileUrl }); }} />
    </div>
  );
}
