import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { completedCourses, inProgressCourses } from "../data/courses";
import "../styles/mycourses.css";

function MyCourses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const normalizedQuery = query.toLowerCase();

  const matchesQuery = (course) => {
    if (!normalizedQuery) {
      return true;
    }
    const searchable = `${course.title} ${course.instructor}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  };

  const filteredInProgress = inProgressCourses.filter(matchesQuery);
  const filteredCompleted = completedCourses.filter(matchesQuery);
  const hasAnyResults = filteredInProgress.length > 0 || filteredCompleted.length > 0;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main mycourses-page">
        <Navbar />
        {query && <p className="search-context">Showing results for "{query}"</p>}

        {/* In Progress */}
        <h2 className="section-title">In Progress</h2>

        <div className="course-grid">
          {filteredInProgress.map((course) => (
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
        {filteredInProgress.length === 0 && query && (
          <p className="empty-state">No in-progress courses matched this search.</p>
        )}

        {/* Completed Courses */}
        <h2 className="section-title">Completed Courses</h2>

        <div className="course-grid">
          {filteredCompleted.map((course) => (
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
        {filteredCompleted.length === 0 && query && (
          <p className="empty-state">No completed courses matched this search.</p>
        )}
        {!hasAnyResults && query && (
          <p className="empty-state">Try another keyword like "AWS" or an instructor name.</p>
        )}

      </div>
    </div>
  );
}

export default MyCourses;
