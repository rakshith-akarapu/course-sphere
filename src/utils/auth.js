const USER_STORAGE_KEY = "course_sphere_current_user";

function toTitleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function formatDisplayName(identifier) {
  const trimmed = identifier.trim();
  if (!trimmed) {
    return "Learner";
  }

  const base = trimmed.includes("@") ? trimmed.split("@")[0] : trimmed;
  const normalized = base.replace(/[._-]+/g, " ").replace(/\s+/g, " ").trim();
  return toTitleCase(normalized) || "Learner";
}

export function createUserFromLogin(identifier) {
  const trimmed = identifier.trim();
  const safeSlug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const fallbackEmail = `${safeSlug || "learner"}@coursesphere.com`;
  const email = trimmed.includes("@") ? trimmed.toLowerCase() : fallbackEmail;

  return {
    name: formatDisplayName(trimmed),
    email,
  };
}

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_STORAGE_KEY);
}
