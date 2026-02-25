import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSave,
  FaUserCircle,
  FaPlus
} from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

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
  const [activeTab, setActiveTab] = useState("description");
  const [activeLesson, setActiveLesson] = useState(0);
  const [videoLink, setVideoLink] = useState("");
  const [lessons, setLessons] = useState([
    "1. Introduction",
    "2. Getting Started"
  ]);

  const addLesson = () => {
    const newLessonNumber = lessons.length + 1;
    setLessons([...lessons, `${newLessonNumber}. New Lesson`]);
  };

  return (
    <>
      <style>{`

        * {
          font-family: "Poppins", sans-serif;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .dashboard {
          display: flex;
          background: #f4f6fb;
          min-height: 100vh;
        }

        .sidebar {
          width: 230px;
          background: white;
          padding: 30px 20px;
          border-right: 1px solid #eee;
        }

        .sidebar h2 {
          color: #6c63ff;
          margin-bottom: 35px;
        }

        .sidebar li {
          list-style: none;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.25s ease;
        }

        .sidebar li:hover {
          background: #f1f1ff;
          transform: translateX(4px);
        }

        .sidebar li.active {
          background: #6c63ff;
          color: white;
          box-shadow: 0 10px 20px rgba(108, 99, 255, 0.28);
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* UPDATED NAVBAR */

        .topbar {
          background: white;
          padding: 10px 30px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-icon {
          color: #555;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .profile-icon:hover {
          color: #6c63ff;
          transform: scale(1.1);
        }

        .logout-btn {
          border: none;
          padding: 6px 16px;
          border-radius: 999px;
          background: linear-gradient(90deg,#6c63ff,#8b7cff);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(108,99,255,0.25);
        }

        /* CONTENT */

        .content {
          padding: 30px 50px;
        }

        .editor-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .video-section {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.05);
        }

        .placeholder-video {
          height: 250px;
          background: #e5e7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #6c63ff;
        }

        .course-title-input {
          width: 100%;
          padding: 15px 20px;
          font-size: 18px;
          border: none;
          border-bottom: 1px solid #eee;
          outline: none;
        }

        .tabs {
          display: flex;
          gap: 25px;
          padding: 12px 25px;
          background: linear-gradient(90deg, #6c63ff, #8b7cff);
          border-radius: 50px;
          width: fit-content;
          margin: 20px 25px;
        }

        .tab {
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          color: rgba(255,255,255,0.85);
        }

        .tab.active {
          background: rgba(255,255,255,0.25);
          color: white;
          border-radius: 25px;
          font-weight: 600;
        }

        .tab-content {
          padding: 25px;
        }

        textarea,
        input[type="file"],
        input[type="text"] {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-top: 10px;
        }

        .sidebar-content {
          background: white;
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.05);
        }

        .lesson-item {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        .lesson-item:hover {
          background: #f1f1ff;
        }

        .lesson-item.active {
          background: #6c63ff;
          color: white;
        }

        .add-lesson-btn {
          margin-top: 10px;
          background: #6c63ff;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }

        .save-wrapper {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }

        .save-btn {
          background: #6c63ff;
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

      `}</style>

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

          {/* UPDATED NAVBAR */}
          <div className="topbar">
            <div className="nav-right">
              <FaUserCircle
                size={24}
                className="profile-icon"
                onClick={goToSettings}
              />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="content">

            <h2 style={{ marginBottom: "25px" }}>Create New Course</h2>

            <div className="editor-layout">

              <div>
                <div className="video-section">

                  <div className="placeholder-video">
                    Upload or Link Course Video
                  </div>

                  <input
                    className="course-title-input"
                    type="text"
                    placeholder="Enter Course Title..."
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />

                  <div className="tabs">
                    {["description","notes","files","video"].map(tab => (
                      <div
                        key={tab}
                        className={`tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.toUpperCase()}
                      </div>
                    ))}
                  </div>

                  <div className="tab-content">
                    {activeTab === "description" && (
                      <textarea placeholder="Enter course description..." />
                    )}

                    {activeTab === "notes" && (
                      <textarea placeholder="Write lecture notes here..." />
                    )}

                    {activeTab === "files" && (
                      <input type="file" multiple />
                    )}

                    {activeTab === "video" && (
                      <>
                        <input type="file" accept="video/*" />
                        <p style={{ margin: "10px 0", textAlign: "center" }}>OR</p>
                        <input
                          type="text"
                          placeholder="Paste YouTube / Video link..."
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                      </>
                    )}
                  </div>

                </div>

                <div className="save-wrapper">
                  <button className="save-btn">
                    <FaSave /> Create Course
                  </button>
                </div>

              </div>

              <div className="sidebar-content">
                <h3>Course Contents</h3>

                {lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className={`lesson-item ${activeLesson === index ? "active" : ""}`}
                    onClick={() => setActiveLesson(index)}
                  >
                    {lesson}
                  </div>
                ))}

                <button className="add-lesson-btn" onClick={addLesson}>
                  <FaPlus /> Add Lesson
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default CreateCourse;