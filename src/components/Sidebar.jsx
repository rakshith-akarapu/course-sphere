import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const syncViewport = (event) => {
      const nextIsMobile = event.matches;
      setIsMobile(nextIsMobile);

      if (!nextIsMobile) {
        setIsOpen(false);
      }
    };

    syncViewport(mediaQuery);
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  return (
    <div className={`sidebar-shell${isOpen ? " is-open" : ""}`}>
      {isMobile && (
        <>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}

      <aside className="sidebar app-sidebar">
        <div className="sidebar-header">
          <h2 className="logo">
            <span className="diamond"></span>
            CourseSphere
          </h2>

          {isMobile && (
            <button
              type="button"
              className="sidebar-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <span aria-hidden="true">✕</span>
            </button>
          )}
        </div>

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
      </aside>
    </div>
  );
}

export default Sidebar;
