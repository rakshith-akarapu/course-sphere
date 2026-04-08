import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";
import { getCourseCoverUrl } from "../../utils/courseMedia";
import "../../styles/educator-layout.css";

const MyCourses = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  // 🔥 FETCH COURSES
  useEffect(() => {
    API.get("/educator/courses", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => setCourses(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="dashboard">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
            <li className="active">My Courses</li>
            <li onClick={() => navigate("/educator/create-course")}>Create Course</li>
            <li onClick={() => navigate("/educator/students")}>Students</li>
            <li onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        <div className="main">

          {/* NAVBAR */}
          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaUserCircle onClick={goToSettings} />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">

            <div className="section-title">My Courses</div>

            <div className="course-grid">

              {courses.map(course => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/educator/course-editor/${course.id}`)}
                >
                  <img
                    src={getCourseCoverUrl(course)}
                    className="course-image"
                    alt=""
                  />

                  <div className="course-body">
                    <div className="course-title">{course.title}</div>
                    <span className="badge">Active</span>
                  </div>
                </div>
              ))}

              {courses.length === 0 && (
                <div className="card" style={{ padding: "20px", maxWidth: "420px" }}>
                  No courses yet. Create your first course to get started.
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
