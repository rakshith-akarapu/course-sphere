export const inProgressCourses = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    progress: 70,
    lessons: "Lesson 5 of 7",
    instructor: "Lina",
    sections: "6 Sections",
    lectures: "202 lectures",
    duration: "19h 37m",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "React Frontend Engineering",
    progress: 45,
    lessons: "Lesson 3 of 7",
    instructor: "Carlos",
    sections: "5 Sections",
    lectures: "124 lectures",
    duration: "11h 20m",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "UI/UX Design with Figma",
    progress: 60,
    lessons: "Lesson 4 of 7",
    instructor: "Mia",
    sections: "7 Sections",
    lectures: "156 lectures",
    duration: "14h 05m",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  },
];

export const completedCourses = [
  {
    id: 4,
    title: "Python for Data Analysis",
    progress: 100,
    lessons: "Lesson 7 of 7",
    instructor: "Ava",
    sections: "4 Sections",
    lectures: "98 lectures",
    duration: "8h 32m",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Docker and Kubernetes Fundamentals",
    progress: 100,
    lessons: "Lesson 7 of 7",
    instructor: "Noah",
    sections: "5 Sections",
    lectures: "113 lectures",
    duration: "9h 48m",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "SQL for Business Intelligence",
    progress: 100,
    lessons: "Lesson 7 of 7",
    instructor: "Emma",
    sections: "4 Sections",
    lectures: "87 lectures",
    duration: "7h 10m",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "JavaScript Data Structures",
    progress: 100,
    lessons: "Lesson 7 of 7",
    instructor: "Liam",
    sections: "6 Sections",
    lectures: "140 lectures",
    duration: "12h 16m",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
];

export const allCourses = [...inProgressCourses, ...completedCourses];

export function getCourseById(id) {
  return allCourses.find((course) => course.id === id);
}
