import React, { useState } from "react";

export default function AboutForm() {
  const [about, setAbout] = useState("");

  const save = () => {
    alert("Saved About");
  };

  return (
    <div>
      <label className="text-sm text-gray-700">About You</label>
      <textarea
        rows={4}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="w-full mt-2 border rounded-lg p-2 bg-gray-50"
      />
      <button
        onClick={save}
        className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm"
      >
        Save
      </button>
    </div>
  );
}
