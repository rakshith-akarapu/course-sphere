import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./utils/auth";

/* ---------------- STUDENT PAGES ---------------- */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import CourseVideo from "./pages/CourseVideo";
import Explore from "./pages/Explore";
import CourseOverview from "./pages/CourseOverview";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import JoinUs from "./pages/JoinUs";
import Assignments from "./pages/Assignments";
import AssignmentUpload from "./pages/AssignmentUpload";

/* ---------------- EDUCATOR PAGES ---------------- */
import EducatorDashboard from "./pages/educator/dashboard/EducatorDashboard";
import EducatorRegister from "./pages/educator/EducatorRegister";
import EducatorAssignments from "./pages/educator/Assignments";
import CreateCourse from "./pages/educator/CreateCourse";
import CourseEditor from "./pages/educator/CourseEditor";
import EducatorMyCourses from "./pages/educator/MyCourses";
import Students from "./pages/educator/Students";
import Doubts from "./pages/educator/Doubts";

/* ---------------- ROLE PROTECTION ---------------- */

function RequireRole({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    // Redirect user to their correct dashboard
    return user.role === "educator"
      ? <Navigate to="/educator/dashboard" replace />
      : <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* ---------------- REDIRECT BASED ON ROLE ---------------- */

function RedirectByRole() {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/" replace />;

  return user.role === "educator"
    ? <Navigate to="/educator/dashboard" replace />
    : <Navigate to="/dashboard" replace />;
}

/* ---------------- APP ---------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* -------- PUBLIC -------- */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/join/:role" element={<JoinUs />} />
        <Route path="/educator/register" element={<EducatorRegister />} />

        {/* -------- STUDENT ROUTES -------- */}

        <Route
          path="/dashboard"
          element={
            <RequireRole role="student">
              <Dashboard />
            </RequireRole>
          }
        />

        <Route
          path="/courses"
          element={
            <RequireRole role="student">
              <MyCourses />
            </RequireRole>
          }
        />

        <Route
          path="/video/:id"
          element={
            <RequireRole role="student">
              <CourseVideo />
            </RequireRole>
          }
        />

        <Route
          path="/video/:id/assignments"
          element={
            <RequireRole role="student">
              <Assignments />
            </RequireRole>
          }
        />

        <Route
          path="/video/:id/assignments/:assignmentId/upload"
          element={
            <RequireRole role="student">
              <AssignmentUpload />
            </RequireRole>
          }
        />

        <Route
          path="/explore"
          element={
            <RequireRole role="student">
              <Explore />
            </RequireRole>
          }
        />

        <Route
          path="/overview/:id"
          element={
            <RequireRole role="student">
              <CourseOverview />
            </RequireRole>
          }
        />

        <Route
          path="/calendar"
          element={
            <RequireRole role="student">
              <Calendar />
            </RequireRole>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireRole role="student">
              <Settings />
            </RequireRole>
          }
        />

        {/* -------- EDUCATOR ROUTES -------- */}

        <Route
          path="/educator/dashboard"
          element={
            <RequireRole role="educator">
              <EducatorDashboard />
            </RequireRole>
          }
        />

        <Route
          path="/educator/courses"
          element={
            <RequireRole role="educator">
              <EducatorMyCourses />
            </RequireRole>
          }
        />

        <Route
          path="/educator/create-course"
          element={
            <RequireRole role="educator">
              <CreateCourse />
            </RequireRole>
          }
        />

        <Route
          path="/educator/course-editor/:id"
          element={
            <RequireRole role="educator">
              <CourseEditor />
            </RequireRole>
          }
        />

        <Route
          path="/educator/assignments"
          element={
            <RequireRole role="educator">
              <EducatorAssignments />
            </RequireRole>
          }
        />

        <Route
          path="/educator/students"
          element={
            <RequireRole role="educator">
              <Students />
            </RequireRole>
          }
        />

        <Route
          path="/educator/doubts"
          element={
            <RequireRole role="educator">
              <Doubts />
            </RequireRole>
          }
        />

        {/* -------- FALLBACK -------- */}

        <Route path="*" element={<RedirectByRole />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;