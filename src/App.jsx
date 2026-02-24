import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { getCurrentUser } from "./utils/auth";

function RequireAuth({ children }) {
  return getCurrentUser() ? children : <Navigate to="/" replace />;
}

function GuestOnly({ children }) {
  return getCurrentUser() ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestOnly><Login /></GuestOnly>} />
        <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
        <Route
          path="/dashboard"
          element={<RequireAuth><Dashboard /></RequireAuth>}
        />
        <Route
          path="/courses"
          element={<RequireAuth><MyCourses /></RequireAuth>}
        />
        <Route
          path="/video/:id"
          element={<RequireAuth><CourseVideo /></RequireAuth>}
        />
        <Route
          path="/video/:id/assignments"
          element={<RequireAuth><Assignments /></RequireAuth>}
        />
        <Route
          path="/video/:id/assignments/:assignmentId/upload"
          element={<RequireAuth><AssignmentUpload /></RequireAuth>}
        />
        <Route
          path="/explore"
          element={<RequireAuth><Explore /></RequireAuth>}
        />
        <Route
          path="/overview/:id"
          element={<RequireAuth><CourseOverview /></RequireAuth>}
        />
        <Route
          path="/calendar"
          element={<RequireAuth><Calendar /></RequireAuth>}
        />
        <Route
          path="/settings"
          element={<RequireAuth><Settings /></RequireAuth>}
        />
        <Route path="/join/:role" element={<JoinUs />} />
        <Route
          path="*"
          element={<Navigate to={getCurrentUser() ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
