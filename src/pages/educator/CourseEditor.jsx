import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaQuestionCircle,
  FaClipboardList
} from "react-icons/fa";

const CourseEditor = () => {

  const navigate = useNavigate();
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
        * { font-family: "Poppins", sans-serif; box-sizing: border-box; margin:0; padding:0; }
        .dashboard { display:flex; background:#f4f6fb; min-height:100vh; }
        .sidebar { width:230px; background:white; padding:30px 20px; border-right:1px solid #eee; }
        .sidebar h2 { color:#6c63ff; margin-bottom:35px; }
        .sidebar li { list-style:none; padding:12px; margin-bottom:12px; border-radius:8px; cursor:pointer; font-size:14px; }
        .sidebar li:hover { background:#f1f1ff; }
        .sidebar li.active { background:#6c63ff; color:white; }
        .main { flex:1; display:flex; flex-direction:column; }
        .topbar { background:white; padding:15px 35px; display:flex; justify-content:space-between; border-bottom:1px solid #eee; }
        .search-container { display:flex; align-items:center; background:#f4f6fb; padding:8px 15px; border-radius:8px; width:250px; gap:10px; }
        .search-container input { border:none; background:transparent; outline:none; width:100%; }
        .nav-right { display:flex; gap:30px; align-items:center; }
        .content { padding:30px 50px; }
        .top-header { display:flex; align-items:center; gap:20px; margin-bottom:25px; }
        .back-btn { cursor:pointer; color:#6c63ff; display:flex; align-items:center; gap:8px; }
        .editor-layout { display:grid; grid-template-columns:2fr 1fr; gap:30px; }
        .video-section { background:white; border-radius:18px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.05); }
        .video-wrapper { position:relative; width:100%; padding-top:56.25%; }
        .video-wrapper iframe { position:absolute; top:0; left:0; width:100%; height:100%; border:none; }
        .course-title { font-size:20px; font-weight:600; padding:20px; }
        .tabs { display:flex; gap:20px; padding:12px 25px; background:linear-gradient(90deg,#6c63ff,#8b7cff); border-radius:50px; width:fit-content; margin:20px 25px; }
        .tab { padding:8px 16px; font-size:14px; cursor:pointer; color:white; opacity:0.8; }
        .tab.active { background:rgba(255,255,255,0.25); border-radius:25px; opacity:1; }
        .tab-content { padding:25px; }
        textarea, input { width:100%; padding:10px; border-radius:8px; border:1px solid #ddd; margin-top:10px; }
        .action-wrapper { margin-top:30px; display:flex; justify-content:flex-end; gap:15px; }
        .btn { padding:12px 20px; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:8px; font-weight:600; color:white; }
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
          </ul>
        </div>

        <div className="main">

          <div className="topbar">
            <div className="search-container">
              <FaSearch/>
              <input placeholder="Search..." />
            </div>
            <div className="nav-right">
              <FaBell/>
              <FaUserCircle size={26}/>
            </div>
          </div>

          <div className="content">

            <div className="top-header">
              <div className="back-btn" onClick={()=>navigate("/educator/courses")}>
                <FaArrowLeft/> Back
              </div>
              <h2>Edit Course</h2>
            </div>

            <div className="editor-layout">

              <div>
                <div className="video-section">

                  <div className="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/iYKl_Sri3pE" title="Lecture"/>
                  </div>

                  <div className="course-title">{lessons[activeLesson]}</div>

                  <div className="tabs">
                    {["description","notes","files"].map(tab=>(
                      <div key={tab}
                        className={`tab ${activeTab===tab?"active":""}`}
                        onClick={()=>setActiveTab(tab)}>
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
                  <div key={i} style={{padding:"10px",cursor:"pointer",background:i===activeLesson?"#6c63ff":"#f1f1ff",color:i===activeLesson?"white":"black",borderRadius:"8px",marginBottom:"10px"}}
                    onClick={()=>setActiveLesson(i)}>
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
