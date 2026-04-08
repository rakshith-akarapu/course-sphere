import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { getCourseCoverUrl } from "../utils/courseMedia";
import "../styles/courseoverview.css";

function CourseOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState({ tone: "", text: "" });
  const [enrolled, setEnrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 FETCH COURSE DETAILS
  useEffect(() => {
    Promise.all([
      API.get(`/student/courses/${id}`),
      API.get("/student/my-courses")
    ])
    .then(([courseRes, enrolledCoursesRes]) => {
      setCourse(courseRes.data);
      setEnrolled(enrolledCoursesRes.data.some((item) => String(item.id) === String(id)));
    })
    .catch(err => console.error(err));
  }, [id]);

  // 🔥 ENROLL API
  const handleEnroll = () => {
    setIsSubmitting(true);
    setMessage({ tone: "", text: "" });

    API.post(`/student/enroll/${id}`, {})
      .then(() => {
        setMessage({ tone: "success", text: "Enrollment successful. You can start learning now." });
        setEnrolled(true);
      })
      .catch(err => {
        console.error(err);
        setMessage({ tone: "error", text: err.response?.data || "Unable to enroll right now." });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        {/* Return */}
        <button
          type="button"
          className="return-btn btn btn-outline btn-sm"
          onClick={() => navigate(-1)}
        >
          ← Return
        </button>

        {/* Banner */}
        <div className="overview-banner">
          <div className="banner-main">
            <img src={getCourseCoverUrl(course)} alt={course?.title || "Course Banner"} />
          </div>

          <div className="banner-preview">
            <img src={getCourseCoverUrl(course)} alt={`${course?.title || "Course"} preview`} />
          </div>
        </div>

        <div className="overview-container">

          <div className="overview-left">
            <div className="overview-heading">
              <span className="overview-kicker">Course overview</span>
              <h1>{course?.title || "Course details"}</h1>
              <p>{course?.educatorEmail || "Instructor details available after enrollment"}</p>
            </div>

            <button className="overview-btn btn btn-outline btn-sm" disabled>
              Overview
            </button>

            <div className="overview-description">
              <h3>Lectures Description</h3>
              <p>
                {course?.description || "No description available"}
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="overview-right">

            {enrolled ? (
              <button
                type="button"
                className="enroll-btn"
                onClick={() => navigate(`/video/${id}`)}
              >
                Go To Course
              </button>
            ) : (
              <button
                type="button"
                className="enroll-btn"
                onClick={handleEnroll}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enrolling..." : "Enroll Now"}
              </button>
            )}

            {message.text && (
              <p className={`status-message ${message.tone} overview-status`}>
                {message.text}
              </p>
            )}

            <div className="course-included">
              <h4>This Course included</h4>
              <ul>
                <li>Access on all devices</li>
                <li>Certification</li>
                <li>Assignments</li>
                <li>Video lessons</li>
              </ul>
            </div>

            <div className="training-box">
              <h4>Training 5 or more people</h4>
              <p>Group learning support available.</p>
            </div>

            <div className="share-box">
              <h4>Share this course</h4>
              <div className="share-icons">
                <span>🔵</span>
                <span>🟣</span>
                <span>🔴</span>
                <span>⚫</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseOverview;
