import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { allCourses } from "../data/courses";
import "../styles/explore.css";

function Explore() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main explore-page">
        <Navbar />

        <h2>Categories</h2>

        {/* Course Section */}
        <div className="course-grid">
          {allCourses.map((course) => (
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

      </div>
    </div>
  );
}

export default Explore;
