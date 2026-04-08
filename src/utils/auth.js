const USER_STORAGE_KEY = "course_sphere_current_user";
const TOKEN_STORAGE_KEY = "token";

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

export function normalizeRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  return normalized === "educator" ? "educator" : "student";
}

export function decodeTokenPayload(token) {
  if (!token) return null;

  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = atob(padded);

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function decodeTokenRole(token) {
  const payload = decodeTokenPayload(token);
  return normalizeRole(payload?.role);
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function isTokenExpired(token) {
  const payload = decodeTokenPayload(token);
  const expiration = payload?.exp;

  if (!expiration) {
    return true;
  }

  return Date.now() >= expiration * 1000;
}

/* ---------------- CREATE USER ---------------- */

export function createUserFromLogin(identifier) {
  const trimmed = identifier.trim();
  const email = trimmed.toLowerCase();
  const safeSlug = email.replace(/[^a-z0-9]+/g, "");
  const resolvedEmail = email.includes("@")
    ? email
    : `${safeSlug || "learner"}@coursesphere.com`;

  return {
    name: formatDisplayName(trimmed),
    email: resolvedEmail,
    role: detectRole(resolvedEmail),
  };
}

/* ---------------- STORAGE ---------------- */

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    clearCurrentUser();
    return null;
  }

  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      role: normalizeRole(parsed?.role),
    };
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({
      ...user,
      role: normalizeRole(user?.role),
    }),
  );
}

export function clearCurrentUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}
