import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { getCourseCoverUrl } from "../utils/courseMedia";
import "../styles/mycourses.css";

function MyCourses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState({ tone: "", text: "" });
  const [pendingCourseId, setPendingCourseId] = useState(null);

  const loadCourses = async () => {
    try {
      const res = await API.get("/student/my-courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FETCH ENROLLED COURSES
  useEffect(() => {
    loadCourses();
  }, []);

  const handleUnenroll = async (event, courseId) => {
    event.stopPropagation();
    setPendingCourseId(courseId);
    setFeedback({ tone: "", text: "" });

    try {
      await API.delete(`/student/enroll/${courseId}`);
      setFeedback({ tone: "success", text: "You have been unenrolled from the course." });
      await loadCourses();
    } catch (err) {
      console.error(err);
      setFeedback({ tone: "error", text: err.response?.data || "Unable to unenroll right now." });
    } finally {
      setPendingCourseId(null);
    }
  };

  // 🔥 SEARCH FILTER
  const filteredCourses = courses.filter(course => {
    if (!query) return true;

    const searchable = `${course.title} ${course.educatorEmail || ""}`.toLowerCase();
    return searchable.includes(query);
  });

  const inProgressCourses = filteredCourses.filter((course) => (course.progress ?? 0) < 100);
  const completedCourses = filteredCourses.filter((course) => (course.progress ?? 0) >= 100);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main mycourses-page">
        <Navbar />

        {query && (
          <p className="search-context">
            Showing results for "{query}"
          </p>
        )}

        {feedback.text && (
          <p className={`status-message ${feedback.tone} page-feedback`}>
            {feedback.text}
          </p>
        )}

        {/* IN PROGRESS */}
        <div className="section-title-row">
          <h2 className="section-title">In Progress</h2>
          <span>{inProgressCourses.length} courses</span>
        </div>

        <div className="course-grid">

          {inProgressCourses.map(course => (

            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/video/${course.id}`)}
            >

              <img
                src={getCourseCoverUrl(course)}
                alt={course.title}
              />

              <div className="course-content">

                <h4>{course.title}</h4>

                <div className="course-footer">
                  <span>{course.educatorEmail}</span>
                  <span className="badge progress">In Progress</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress ?? 0}%` }}></div>
                </div>

                <p className="lesson-text">{course.progress ?? 0}% completed</p>

                <button
                  type="button"
                  className="btn btn-danger btn-sm course-action-btn"
                  onClick={(event) => handleUnenroll(event, course.id)}
                  disabled={pendingCourseId === course.id}
                >
                  {pendingCourseId === course.id ? "Unenrolling..." : "Unenroll"}
                </button>

              </div>

            </div>

          ))}

          {inProgressCourses.length === 0 && (
            <p className="empty-state">No courses in progress.</p>
          )}

        </div>

        {/* COMPLETED */}
        <div className="section-title-row">
          <h2 className="section-title">Completed Courses</h2>
          <span>{completedCourses.length} courses</span>
        </div>

        <div className="course-grid">

          {completedCourses.map(course => (

            <div
              key={course.id}
              className="course-card completed"
              onClick={() => navigate(`/video/${course.id}`)}
            >

              <img
                src={getCourseCoverUrl(course)}
                alt={course.title}
              />

              <div className="course-content">

                <h4>{course.title}</h4>

                <div className="course-footer">
                  <span>{course.educatorEmail}</span>
                  <span className="badge completed">Completed</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill completed-fill" style={{ width: `${course.progress ?? 100}%` }}></div>
                </div>

                <p className="lesson-text">Finished</p>

              </div>

            </div>

          ))}

          {completedCourses.length === 0 && (
            <p className="empty-state">No completed courses yet.</p>
          )}

        </div>

        {filteredCourses.length === 0 && (
          <p className="empty-state">
            No courses found.
          </p>
        )}

      </div>
    </div>
  );
}

export default MyCourses;
