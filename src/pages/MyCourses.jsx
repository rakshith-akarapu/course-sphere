import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { completedCourses, inProgressCourses } from "../data/courses";
import "../styles/mycourses.css";

function MyCourses() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main mycourses-page">
        <Navbar />

        {/* In Progress */}
        <h2 className="section-title">In Progress</h2>

        <div className="course-grid">
          {inProgressCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/video/${course.id}`)}
            >
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = "/course-banner.png";
                }}
              />

              <div className="course-content">
                <h4>{course.title}</h4>

                <div className="course-footer">
                  <span>{course.instructor}</span>
                  <span className="badge progress">In Progress</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <p className="lesson-text">{course.lessons}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Courses */}
        <h2 className="section-title">Completed Courses</h2>

        <div className="course-grid">
          {completedCourses.map((course) => (
            <div
              key={course.id}
              className="course-card completed"
              onClick={() => navigate(`/video/${course.id}`)}
            >
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = "/course-banner.png";
                }}
              />

              <div className="course-content">
                <h4>{course.title}</h4>

                <div className="course-footer">
                  <span>{course.instructor}</span>
                  <span className="badge completed">Completed</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill completed-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <p className="lesson-text">{course.lessons}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MyCourses;
