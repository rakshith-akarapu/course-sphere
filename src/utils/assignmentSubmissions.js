const ASSIGNMENT_STORAGE_KEY = "course_sphere_assignment_submissions";

function getStorageMap() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(ASSIGNMENT_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
}

function saveStorageMap(mapValue) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ASSIGNMENT_STORAGE_KEY, JSON.stringify(mapValue));
}

function getSubmissionKey(courseId, assignmentId) {
  return `${courseId}:${assignmentId}`;
}

export function getAssignmentSubmission(courseId, assignmentId) {
  const mapValue = getStorageMap();
  return mapValue[getSubmissionKey(courseId, assignmentId)] || null;
}

export function saveAssignmentSubmission(courseId, assignmentId, payload) {
  const mapValue = getStorageMap();
  mapValue[getSubmissionKey(courseId, assignmentId)] = payload;
  saveStorageMap(mapValue);
}
