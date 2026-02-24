const USER_STORAGE_KEY = "course_sphere_current_user";

/* ---------------- NAME FORMAT ---------------- */

function toTitleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function formatDisplayName(identifier) {
  const trimmed = identifier.trim();
  if (!trimmed) return "Learner";

  const base = trimmed.includes("@") ? trimmed.split("@")[0] : trimmed;
  const normalized = base.replace(/[._-]+/g, " ").replace(/\s+/g, " ").trim();

  return toTitleCase(normalized) || "Learner";
}

/* ---------------- ROLE DETECTION ---------------- */

function detectRole(email) {
  return email.toLowerCase().endsWith("edu@gmail.com")
    ? "educator"
    : "student";
}

/* ---------------- CREATE USER ---------------- */

export function createUserFromLogin(identifier) {
  const email = identifier.trim().toLowerCase();

  return {
    name: formatDisplayName(identifier),
    email,
    role: detectRole(email), // 🔥 IMPORTANT
  };
}

/* ---------------- STORAGE ---------------- */

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}