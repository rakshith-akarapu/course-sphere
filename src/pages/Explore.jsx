import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { allCourses } from "../data/courses";
import "../styles/explore.css";

function Explore() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const normalizedQuery = query.toLowerCase();

  const filteredCourses = allCourses.filter((course) => {
    if (!normalizedQuery) {
      return true;
    }
    const searchable = `${course.title} ${course.instructor}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main explore-page">
        <Navbar />

        <h2>Categories</h2>
        {query && <p className="search-context">Showing results for "{query}"</p>}

        {/* Course Section */}
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/overview/${course.id}`)}
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
                <p>{course.instructor}</p>
              </div>
            </div>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <p className="empty-state">No courses found for this search.</p>
        )}

      </div>
    </div>
  );
}

export default Explore;
