import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar app-sidebar">

      <h2 className="logo">
        <span className="diamond"></span>
        CourseSphere
      </h2>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}
        >
          My Courses
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}
        >
          Calendar
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}
        >
          Explore Courses
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}
        >
          Settings
        </NavLink>
      </nav>

    </div>
  );
}

export default Sidebar;
