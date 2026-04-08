import React, { useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { clearCurrentUser, getCurrentUser } from "../../utils/auth";
import "../../styles/educatorNavbar.css";

const EducatorNavbar = () => {

  const navigate = useNavigate();
  const user = getCurrentUser();


  const [search, setSearch] = useState("");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  // 🔥 SEARCH FUNCTION (optional)
  const handleSearch = () => {
    if (!search.trim()) return;

    // Example: navigate to courses page with search query
    navigate(`/educator/courses?q=${search}`);
  };

  return (
    <div className="topbar">

      {/* 🔍 SEARCH */}
      <div className="search-container">
        <FaSearch />
        <input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* 👤 RIGHT SIDE */}
      <div className="nav-right">

        {/* ✅ USER NAME */}
        <span style={{ fontWeight: "500" }}>
          {user?.name || "Educator"}
        </span>

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