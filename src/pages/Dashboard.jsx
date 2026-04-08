import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { getCurrentUser } from "../utils/auth";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const firstName = currentUser?.name?.split(" ")[0] || "Learner";

  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/student/my-courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const recentCourse = courses[0];
  const recentProgress = recentCourse?.progress ?? 0;
  const noteUrl = recentCourse?.fileUrl ? `http://localhost:3366${recentCourse.fileUrl}` : "";

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <section className="dashboard-hero">
          <div>
            <span className="dashboard-kicker">Student Workspace</span>
            <h1>Hello {firstName}</h1>
            <p className="subtitle">
              Track your learning, revisit course material, and keep progress moving every day.
            </p>
          </div>

          <div className="dashboard-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/explore")}
            >
              Explore Courses
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/courses")}
            >
              View My Courses
            </button>
          </div>
        </section>

        <div className="top-cards">
          <div className="dashboard-card">
            <h4>Recent enrolled course</h4>
            <p className="course-title">
              {recentCourse?.title || "No course enrolled yet"}
            </p>
            <p className="card-caption">
              {recentCourse
                ? `${recentCourse.educatorEmail || "Educator"} • ${recentProgress}% complete`
                : "Enroll in a course to surface your latest activity here."}
            </p>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${recentProgress}%` }}></div>
            </div>

            <span className="progress-text">
              {recentCourse ? (recentProgress >= 100 ? "Completed" : "In Progress") : "No active progress"}
            </span>
          </div>

          <div className="dashboard-card">
            <h4>Recently accessed materials</h4>

            <div className="file-item">
              <span className="file pdf">PDF</span>
              <span>{recentCourse?.title ? `${recentCourse.title} notes` : "No notes available yet"}</span>
              {noteUrl ? (
                <a href={noteUrl} target="_blank" rel="noreferrer">Download</a>
              ) : (
                <span className="muted-link">Soon</span>
              )}
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm dashboard-action-btn"
              onClick={() => navigate("/courses")}
            >
              See more
            </button>
          </div>

          <div className="dashboard-card calendar">
            <h4>{currentMonth} {currentYear}</h4>

            <div className="calendar-grid">
              {[...Array(30)].map((_, i) => (
                <span
                  key={i}
                  className={currentDate === i + 1 ? "today" : ""}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <div className="dashboard-card courses-box">
            <div className="section-header-row">
              <h3>Enrolled Courses</h3>
              <span>{courses.length} active</span>
            </div>

            {courses.length > 0 ? (
              courses.map((course, index) => (
                <button
                  key={course.id}
                  type="button"
                  className={`course-item ${index === 0 ? "active" : ""}`}
                  onClick={() => navigate(`/video/${course.id}`)}
                >
                  <div>
                    <p>{course.title}</p>
                    <span>{course.educatorEmail || `Course ID: ${course.id}`}</span>
                  </div>
                  <strong>{course.progress ?? 0}%</strong>
                </button>
              ))
            ) : (
              <p className="empty-card-message">
                Your enrolled courses will appear here once you join them.
              </p>
            )}
          </div>

          <div className="dashboard-card performance-box">
            <div className="section-header-row">
              <h3>Performance</h3>
              <span>Weekly view</span>
            </div>

            <p className="card-caption">
              A simple snapshot of your overall score across active learning sessions.
            </p>

            <div className="gauge-wrapper">
              <div className="gauge-background"></div>
              <div className="gauge-progress"></div>

              <div className="gauge-text">
                <p>Your Grade</p>
                <h2>8.9</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
