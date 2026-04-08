import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaUserCircle, FaSearch } from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";
import "../../styles/educator-layout.css";

const CreateCourse = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // 🔥 CREATE COURSE API
  const handleCreateCourse = async () => {
    if (!courseTitle.trim()) {
      alert("Course title required ❗");
      return;
    }

    const newCourse = {
      title: courseTitle,
      description: description,
      videoUrl: videoLink
    };

    try {
      await API.post("/educator/courses", newCourse);
      alert("Course created successfully 🎉");
      navigate("/educator/courses");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data ||
        (err.request ? "Backend not reachable. Check if the Spring Boot app is running on port 3366." : null) ||
        "Error creating course ❌";
      alert(message);
    }
  };

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>CourseSphere</h2>
        <ul>
          <li onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/educator/courses")}>My Courses</li>
          <li className="active">Create Course</li>
          <li onClick={() => navigate("/educator/students")}>Students</li>
          <li onClick={() => navigate("/educator/settings")}>Settings</li>
        </ul>
      </div>

      <div className="main">

        <div className="topbar">
          <div className="search-container">
            <FaSearch />
            <input placeholder="Search resources..." />
          </div>

          <div className="nav-right">
            <FaUserCircle onClick={goToSettings}/>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="content">
          <div className="section-title">Curriculum Builder</div>

          <div className="editor-layout">
            <div className="video-section">

              <input
                className="course-title-input"
                placeholder="Name your new amazing course..."
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />

              <div className="tabs">
                {["description","video url"].map(tab => (
                  <div
                    key={tab}
                    className={`tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {activeTab === "description" && (
                <div className="field">
                  <textarea
                    rows={8}
                    placeholder="Provide a detailed description of the syllabus, outcomes, and expectations..."
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  />
                </div>
              )}

              {activeTab === "video url" && (
                <div className="field">
                  <input
                    placeholder="https://vimeo.com/... or https://youtube.com/..."
                    value={videoLink}
                    onChange={(e)=>setVideoLink(e.target.value)}
                  />
                </div>
              )}

              <div className="save-wrapper">
                <button className="save-btn" onClick={handleCreateCourse}>
                  <FaSave style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Create Class
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
