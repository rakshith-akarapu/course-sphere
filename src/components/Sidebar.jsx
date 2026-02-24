import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        <span className="diamond"></span>
        CourseSphere
      </h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/courses">My Courses</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/explore">Explore Courses</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

    </div>
  );
}

export default Sidebar;