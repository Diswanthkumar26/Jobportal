// src/utils/photoUrl.js
const API_BASE = "http://localhost:8081";

export const normalizePhotoUrl = (url) => {
  if (!url) return "";
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return encodeURI(url);
    }
    const cleaned = url.replace(/^\/+/, ""); // "uploads/users/..."
    const full = `${API_BASE}/${cleaned}`;   // "http://localhost:8081/uploads/users/..."
    return encodeURI(full);
  } catch {
    return url;
  }
};
