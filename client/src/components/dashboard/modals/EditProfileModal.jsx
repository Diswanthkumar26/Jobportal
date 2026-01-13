import React, { useState, useEffect } from "react";

export default function EditProfileModal({
  open,
  onClose,
  onSave,
  initial,
  onChangePhoto,
  onDeletePhoto,
}) {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const [experienceText, setExperienceText] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [ctc, setCtc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");

  // server URL
  const [photoUrl, setPhotoUrl] = useState(null);
  // local preview blob
  const [previewUrl, setPreviewUrl] = useState(null);

  // load initial values when opening
  useEffect(() => {
    if (!initial) return;
    setName(initial.name || "");
    setHeadline(initial.headline || "");
    setLocation(initial.location || "");
    setCompany(initial.company || "");
    setExperienceText(initial.experienceText || "");
    setCurrentCtc(initial.currentCtc || "");
    setCtc(initial.ctc || "");
    setPhone(initial.phone || "");
    setEmail(initial.email || "");
    setNoticePeriod(initial.noticePeriod || "");
    setPhotoUrl(initial.photoUrl || null);
    setPreviewUrl(null);
  }, [initial, open]);

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // cleanup preview blob
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    if (onChangePhoto) onChangePhoto(file);
  };

  const handleDeletePhoto = () => {
    setPhotoUrl(null);
    setPreviewUrl(null);
    if (onDeletePhoto) onDeletePhoto();
  };

  const displayUrl =
    previewUrl ? previewUrl :
    photoUrl ? photoUrl :
    "/default-avatar.jpg";

  const handleSave = () => {
    onSave({
      name,
      headline,
      location,
      company,
      experienceText,
      currentCtc,
      ctc,
      phone,
      email,
      noticePeriod,
      photoUrl,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white w-[620px] rounded-2xl p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Edit profile
          </h2>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
            onClick={onClose}
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center mb-3">
            <img
              src={displayUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <input
            id="profile-photo-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("profile-photo-input").click()
            }
            className="px-6 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium mb-2"
          >
            Replace photo
          </button>
          {(photoUrl || previewUrl) && (
            <button
              type="button"
              onClick={handleDeletePhoto}
              className="text-xs text-red-500 hover:underline mb-1"
            >
              Delete
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Headline (e.g. Fullstack Developer)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Company / Current organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Location (City, Country)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Total experience (e.g. 0 Year 6 Months)"
            value={experienceText}
            onChange={(e) => setExperienceText(e.target.value)}
          />

          {/* Current CTC */}
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 border border-slate-200 p-2 rounded text-sm"
              placeholder="Current CTC in LPA (e.g. 2.5)"
              value={currentCtc}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9]*\.?[0-9]*$/.test(val)) {
                  setCurrentCtc(val);
                }
              }}
            />
            {currentCtc && (
              <button
                type="button"
                onClick={() => setCurrentCtc("")}
                className="text-[11px] text-slate-500 hover:text-red-500"
              >
                Clear
              </button>
            )}
          </div>

          {/* Expected CTC */}
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 border border-slate-200 p-2 rounded text-sm"
              placeholder="Expected CTC in LPA (e.g. 4)"
              value={ctc}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9]*\.?[0-9]*$/.test(val)) {
                  setCtc(val);
                }
              }}
            />
            {ctc && (
              <button
                type="button"
                onClick={() => setCtc("")}
                className="text-[11px] text-slate-500 hover:text-red-500"
              >
                Clear
              </button>
            )}
          </div>

          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-slate-200 p-2 rounded text-sm"
            placeholder="Notice period"
            value={noticePeriod}
            onChange={(e) => setNoticePeriod(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 text-slate-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
