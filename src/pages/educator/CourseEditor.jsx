import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaUserCircle,
  FaQuestionCircle,
  FaClipboardList
} from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const CourseEditor = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [activeTab, setActiveTab] = useState("description");
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    "1. Sign up in Webflow",
    "2. What is Webflow?",
    "3. Web Development Basics",
    "4. Advanced Layout Techniques"
  ];

  return (
    <>
      <style>{`
        * { 
          font-family: "Poppins", sans-serif; 
          box-sizing: border-box; 
          margin:0; 
          padding:0; 
        }

        .dashboard { 
          display:flex; 
          background:#f4f6fb; 
          min-height:100vh; 
        }

        .sidebar {
          width:230px;
          background:white;
          padding:30px 20px;
          border-right:1px solid #eee;
        }

        .sidebar h2 { 
          color:#6c63ff; 
          margin-bottom:35px; 
        }

        .sidebar li {
          list-style:none;
          padding:12px;
          margin-bottom:12px;
          border-radius:8px;
          cursor:pointer;
          font-size:14px;
          transition:0.25s ease;
        }

        .sidebar li:hover {
          background:#f1f1ff;
          transform:translateX(4px);
        }

        .sidebar li.active {
          background:#6c63ff;
          color:white;
          box-shadow:0 10px 20px rgba(108, 99, 255, 0.28);
        }

        .main { 
          flex:1; 
          display:flex; 
          flex-direction:column; 
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
          border:none;
          padding:6px 16px;
          border-radius:999px;
          background:linear-gradient(90deg,#6c63ff,#8b7cff);
          color:#fff;
          cursor:pointer;
          font-weight:600;
          transition:0.2s ease;
        }

        .logout-btn:hover {
          transform:translateY(-1px);
          box-shadow:0 8px 18px rgba(108,99,255,0.25);
        }

        .content { 
          padding:30px 50px; 
        }

        .back-button {
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 18px;
          border-radius:8px;
          border:1px solid #6c63ff;
          background:white;
          color:#6c63ff;
          font-weight:600;
          cursor:pointer;
          transition:0.25s ease;
          margin-bottom:15px;
        }

        .back-button:hover {
          background:#6c63ff;
          color:white;
          transform:translateY(-1px);
          box-shadow:0 8px 18px rgba(108,99,255,0.25);
        }

        .page-title {
          font-size:24px;
          font-weight:600;
          margin-bottom:25px;
        }

        .editor-layout {
          display:grid;
          grid-template-columns:2fr 1fr;
          gap:30px;
        }

        .video-section {
          background:white;
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 12px 30px rgba(0,0,0,0.05);
        }

        .video-wrapper {
          position:relative;
          width:100%;
          padding-top:56.25%;
        }

        .video-wrapper iframe {
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          border:none;
        }

        .course-title {
          font-size:20px;
          font-weight:600;
          padding:20px;
        }

        .tabs {
          display:flex;
          gap:20px;
          padding:12px 25px;
          background:linear-gradient(90deg,#6c63ff,#8b7cff);
          border-radius:50px;
          width:fit-content;
          margin:20px 25px;
        }

        .tab {
          padding:8px 16px;
          font-size:14px;
          cursor:pointer;
          color:white;
          opacity:0.8;
        }

        .tab.active {
          background:rgba(255,255,255,0.25);
          border-radius:25px;
          opacity:1;
        }

        .tab-content { 
          padding:25px; 
        }

        textarea, input {
          width:100%;
          padding:10px;
          border-radius:8px;
          border:1px solid #ddd;
          margin-top:10px;
        }

        .action-wrapper {
          margin-top:30px;
          display:flex;
          justify-content:flex-end;
          gap:15px;
        }

        .btn {
          padding:12px 20px;
          border:none;
          border-radius:8px;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:8px;
          font-weight:600;
          color:white;
        }

        .save { background:#6c63ff; }
        .doubt { background:#00b894; }
        .assign { background:#0984e3; }

      `}</style>

      <div className="dashboard">

        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={()=>navigate("/educator/dashboard")}>Dashboard</li>
            <li className="active" onClick={()=>navigate("/educator/courses")}>My Courses</li>
            <li onClick={()=>navigate("/educator/create-course")}>Create Course</li>
            <li onClick={()=>navigate("/educator/students")}>Students</li>
            <li onClick={()=>navigate("/educator/settings")}>Settings</li>
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

            <button
              className="back-button"
              onClick={()=>navigate("/educator/courses")}
            >
              <FaArrowLeft/> Back to Courses
            </button>

            <div className="page-title">Edit Course</div>

            <div className="editor-layout">

              <div>
                <div className="video-section">
                  <div className="video-wrapper">
                    <iframe 
                      src="https://www.youtube.com/embed/iYKl_Sri3pE" 
                      title="Lecture"
                    />
                  </div>

                  <div className="course-title">
                    {lessons[activeLesson]}
                  </div>

                  <div className="tabs">
                    {["description","notes","files"].map(tab=>(
                      <div
                        key={tab}
                        className={`tab ${activeTab===tab?"active":""}`}
                        onClick={()=>setActiveTab(tab)}
                      >
                        {tab.toUpperCase()}
                      </div>
                    ))}
                  </div>

                  <div className="tab-content">
                    {activeTab==="description" && <textarea defaultValue="Course description here..." />}
                    {activeTab==="notes" && <textarea defaultValue="Lecture notes here..." />}
                    {activeTab==="files" && <input type="file" multiple />}
                  </div>
                </div>

                <div className="action-wrapper">
                  <button className="btn save"><FaSave/> Save</button>
                  <button className="btn doubt" onClick={()=>navigate("/educator/doubts")}><FaQuestionCircle/> Doubts</button>
                  <button className="btn assign" onClick={()=>navigate("/educator/assignments")}><FaClipboardList/> Assignments</button>
                </div>
              </div>

              <div style={{background:"white",padding:"20px",borderRadius:"18px"}}>
                <h3>Course Contents</h3>
                {lessons.map((lesson,i)=>(
                  <div
                    key={i}
                    style={{
                      padding:"10px",
                      cursor:"pointer",
                      background:i===activeLesson?"#6c63ff":"#f1f1ff",
                      color:i===activeLesson?"white":"black",
                      borderRadius:"8px",
                      marginBottom:"10px"
                    }}
                    onClick={()=>setActiveLesson(i)}
                  >
                    {lesson}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEditor;