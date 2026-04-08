import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaUserCircle,
  FaQuestionCircle,
  FaClipboardList,
  FaTrash
} from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";

const CourseEditor = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };


  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notesFile, setNotesFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  // 🔥 FETCH COURSE
  useEffect(() => {
    API.get(`/educator/courses/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      setCourse(res.data);
      setTitle(res.data.title || "");
      setDescription(res.data.description || "");
      setVideoUrl(res.data.videoUrl || "");
    })
    .catch(err => console.error(err));
  }, [id, token]);

  // 🔥 SAVE COURSE
  const handleSave = () => {

    const updatedCourse = {
      ...course,
      title: title,
      videoUrl: videoUrl,
      description: description
    };

    API.put(
      `/educator/courses/${id}`,
      updatedCourse,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
    .then((res) => {
      setCourse(res.data);
      setStatusMessage("Course updated successfully.");
    })
    .catch(err => {
      console.error(err);
      setStatusMessage(err.response?.data || "Unable to update course.");
    });
  };

  const handleNotesUpload = async () => {
    if (!notesFile) {
      setStatusMessage("Choose a notes file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", notesFile);

      const res = await API.post(`/file/upload/course/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        }
      });

      setCourse(res.data);
      setNotesFile(null);
      setStatusMessage("Lecture notes uploaded successfully.");
    } catch (err) {
      console.error(err);
      setStatusMessage(err.response?.data || "Unable to upload notes.");
    }
  };

  const handleDeleteCourse = async () => {
    const shouldDelete = window.confirm("Delete this course and all related enrollments, assignments, and doubts?");
    if (!shouldDelete) return;

    try {
      setIsDeleting(true);
      await API.delete(`/educator/courses/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      navigate("/educator/courses", { replace: true });
    } catch (err) {
      console.error(err);
      setStatusMessage(err.response?.data || "Unable to delete course.");
      setIsDeleting(false);
    }
  };

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
        }

        .sidebar li.active {
          background:#6c63ff;
          color:white;
        }

        .main { 
          flex:1; 
          display:flex; 
          flex-direction:column; 
        }

        .topbar {
          background: white;
          padding: 10px 30px;
          display: flex;
          justify-content: flex-end;
        }

        .nav-right {
          display: flex;
          gap: 20px;
        }

        .logout-btn {
          background:#6c63ff;
          color:white;
          border:none;
          padding:6px 16px;
          border-radius:999px;
        }

        .content { 
          padding:30px 50px; 
        }

        .back-button {
          padding:10px 18px;
          border-radius:8px;
          border:1px solid #6c63ff;
          background:white;
          color:#6c63ff;
          margin-bottom:15px;
        }

        .page-title {
          font-size:24px;
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
          padding:20px;
        }

        .course-title {
          font-size:20px;
          margin-bottom:15px;
        }

        textarea {
          width:100%;
          padding:10px;
          border-radius:8px;
          border:1px solid #ddd;
        }

        .field-label {
          display:block;
          margin-bottom:8px;
          font-weight:600;
        }

        .text-input {
          width:100%;
          padding:10px;
          border-radius:8px;
          border:1px solid #ddd;
          margin-bottom:14px;
        }

        .action-wrapper {
          margin-top:20px;
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        .btn {
          padding:10px 16px;
          border:none;
          border-radius:6px;
          color:white;
          cursor:pointer;
        }

        .save { background:#6c63ff; }
        .doubt { background:#00b894; }
        .assign { background:#0984e3; }
        .danger { background:#ef4444; }

      `}</style>

      <div className="dashboard">

        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={()=>navigate("/educator/dashboard")}>Dashboard</li>
            <li className="active">My Courses</li>
          </ul>
        </div>

        <div className="main">

          <div className="topbar">
            <div className="nav-right">
              <FaUserCircle onClick={goToSettings}/>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="content">

            <button className="back-button" onClick={()=>navigate("/educator/courses")}>
              <FaArrowLeft/> Back
            </button>

            <div className="page-title">
              Edit Course: {course.title}
            </div>

            <div className="editor-layout">

              <div className="video-section">

                <div className="course-title">
                  {course.title}
                </div>
                {statusMessage && (
                  <p style={{ marginBottom: "14px", color: "#2563eb" }}>{statusMessage}</p>
                )}

                <label className="field-label">Course Title</label>
                <input
                  className="text-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label className="field-label">YouTube / Video URL</label>
                <input
                  className="text-input"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />

                <label className="field-label">Description</label>

                <textarea
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />

                <label className="field-label" style={{ marginTop: "16px" }}>Lecture Notes</label>
                <input
                  type="file"
                  onChange={(e) => setNotesFile(e.target.files?.[0] || null)}
                />

                {course.fileUrl && (
                  <p style={{ marginTop: "8px" }}>
                    Current notes file is available for students to download.
                  </p>
                )}

                <div className="action-wrapper">
                  <button className="btn save" onClick={handleSave}>
                    <FaSave/> Save
                  </button>

                  <button className="btn save" onClick={handleNotesUpload}>
                    <FaSave/> Upload Notes
                  </button>

                  <button className="btn doubt" onClick={()=>navigate("/educator/doubts")}>
                    <FaQuestionCircle/> Doubts
                  </button>

                  <button className="btn assign" onClick={()=>navigate(`/educator/courses/${id}/assignments`)}>
                    <FaClipboardList/> Assignments
                  </button>

                  <button className="btn danger" onClick={handleDeleteCourse} disabled={isDeleting}>
                    <FaTrash/> {isDeleting ? "Deleting..." : "Delete Course"}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEditor;
