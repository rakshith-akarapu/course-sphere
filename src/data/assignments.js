export const baseAssignments = [
  {
    id: 1,
    title: "Conducting User Research",
    module: "User Research and Personas",
    dueDate: "July 1, 2024",
    defaultSubmitted: true,
  },
  {
    id: 2,
    title: "Usability Testing and Feedback",
    module: "Usability Testing and Iteration",
    dueDate: "August 22, 2024",
    defaultSubmitted: false,
  },
  {
    id: 3,
    title: "Developing Visual Design Elements",
    module: "Visual Design and Branding",
    dueDate: "August 29, 2024",
    defaultSubmitted: false,
  },
];

export function getAssignmentsByCourseId() {
  return baseAssignments;
}

export function getAssignmentById(courseId, assignmentId) {
  const assignments = getAssignmentsByCourseId(courseId);
  return assignments.find((assignment) => assignment.id === assignmentId);
}
