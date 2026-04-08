import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { getCourseCoverUrl } from "../utils/courseMedia";
import "../styles/explore.css";

function Explore() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  // 🔥 FETCH COURSES FROM BACKEND
  useEffect(() => {
    API.get("/student/courses", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => setCourses(res.data))
    .catch(err => console.error(err));
  }, []);

  // 🔥 SEARCH FILTER
  const filteredCourses = courses.filter(course => {
    if (!query) return true;

    const searchable = `${course.title} ${course.educatorEmail || ""}`.toLowerCase();
    return searchable.includes(query);
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main explore-page">
        <Navbar />

        <h2>Categories</h2>

        {query && (
          <p className="search-context">
            Showing results for "{query}"
          </p>
        )}

        {/* COURSE GRID */}
        <div className="course-grid">

          {filteredCourses.map(course => (

            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/overview/${course.id}`)}
            >

              <img
                src={getCourseCoverUrl(course)}
                alt={course.title}
              />

              <div className="course-content">
                <h4>{course.title}</h4>
                <p>{course.educatorEmail}</p>
              </div>

            </div>

          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredCourses.length === 0 && (
          <p className="empty-state">
            No courses found for this search.
          </p>
        )}

      </div>
    </div>
  );
}

export default Explore;
