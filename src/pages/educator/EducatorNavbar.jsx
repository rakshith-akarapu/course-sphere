import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../../utils/auth";
import "../../styles/educatorNavbar.css";
const EducatorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  return (
    <div className="topbar">
      <div className="search-container">
        <FaSearch />
        <input placeholder="Search..." />
      </div>

      <div className="nav-right">
        <FaUserCircle
          size={26}
          className="profile-icon"
          onClick={goToSettings}
        />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default EducatorNavbar;