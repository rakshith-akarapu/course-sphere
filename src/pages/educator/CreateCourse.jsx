import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaPlus
} from "react-icons/fa";

const CreateCourse = () => {

  const navigate = useNavigate();

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

        /* SIDEBAR */
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
          transition: 0.2s ease;
        }

        .sidebar li:hover {
          background: #f1f1ff;
        }

        .sidebar li.active {
          background: #6c63ff;
          color: white;
        }

        /* MAIN */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* TOPBAR */
        .topbar {
          background: white;
          padding: 15px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: #f4f6fb;
          padding: 8px 15px;
          border-radius: 8px;
          width: 250px;
          gap: 10px;
        }

        .search-container input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        /* CONTENT */
        .content {
          padding: 30px 50px;
        }

        .top-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .back-btn {
          cursor: pointer;
          color: #6c63ff;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
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
          align-items: center;
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
          font-weight: 500;
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

        textarea {
          width: 100%;
          min-height: 160px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          resize: vertical;
        }

        input[type="file"],
        input[type="text"] {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
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
          transition: 0.2s ease;
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

        .save-btn:hover {
          background: #574fd6;
        }

      `}</style>

      <div className="dashboard">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/educator/courses")}>My Courses</li>
            <li className="active" onClick={() => navigate("/educator/create-course")}>Create Course</li>
            <li onClick={() => navigate("/educator/students")}>Students</li>
            <li onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* TOPBAR */}
          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="nav-right">
              <FaBell />
              <FaUserCircle size={26} />
            </div>
          </div>

          <div className="content">

            <div className="top-header">
              <div className="back-btn" onClick={() => navigate("/educator/dashboard")}>
                <FaArrowLeft /> Back
              </div>
              <h2>Create New Course</h2>
            </div>

            <div className="editor-layout">

              {/* LEFT SIDE */}
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
                        {tab === "description" && "Description"}
                        {tab === "notes" && "Lecture Notes"}
                        {tab === "files" && "Attach Files"}
                        {tab === "video" && "Video"}
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

              {/* RIGHT SIDE */}
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
