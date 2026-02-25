import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const MyCourses = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const activeCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "Arjun Rao",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Meera Kapoor",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d"
    },
    {
      id: 3,
      title: "Cloud Computing with AWS",
      instructor: "Rahul Sharma",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd"
    }
  ];

  const previousCourses = [
    {
      id: 4,
      title: "Data Structures & Algorithms",
      instructor: "Vikram Patel",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      instructor: "Sneha Iyer",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
    },
    {
      id: 6,
      title: "React JS Bootcamp",
      instructor: "Ankit Verma",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: 7,
      title: "Cybersecurity Fundamentals",
      instructor: "Neha Singh",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    }
  ];

  return (
    <>
      <style>{`

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .dashboard {
          display: flex;
          background: #f4f6fb;
          min-height: 100vh;
        }

        /* SIDEBAR */

        .sidebar {
          width: 230px;
          background: white;
          padding: 30px 20px;
          border-right: 1px solid #eee;
        }

        .sidebar h2 {
          color: #6c63ff;
          margin-bottom: 35px;
        }

        .sidebar li {
          list-style: none;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.25s ease;
        }

        .sidebar li:hover {
          background: #f1f1ff;
          transform: translateX(4px);
        }

        .sidebar li.active {
          background: #6c63ff;
          color: white;
          box-shadow: 0 10px 20px rgba(108, 99, 255, 0.28);
        }

        /* MAIN */

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* TOP NAV */

        .topbar {
          background: white;
          padding: 15px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: #f4f6fb;
          padding: 8px 15px;
          border-radius: 8px;
          width: 300px;
          gap: 10px;
          transition: 0.2s ease;
        }

        .search-container:focus-within {
          background: white;
          border: 1px solid #6c63ff;
        }

        .search-container input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .logout-btn {
          border: none;
          padding: 9px 16px;
          border-radius: 999px;
          background: linear-gradient(90deg, #5f5bd6, #7a77e6);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(95, 91, 214, 0.3);
        }

        .content {
          padding: 35px;
        }

        h2.section-title {
          margin-bottom: 20px;
        }

        /* COURSE GRID */

        .course-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 50px;
        }

        .course-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }

        .course-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .course-card:hover .course-image {
          transform: scale(1.05);
        }

        .course-body {
          padding: 18px;
        }

        .course-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .instructor-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .progress-badge {
          background: #6c63ff;
          color: white;
        }

        .completed-badge {
          background: #2ecc71;
          color: white;
        }

      `}</style>

      <div className="dashboard">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={() => navigate("/educator/dashboard")}>
              Dashboard
            </li>

            <li
              className="active"
              onClick={() => navigate("/educator/courses")}
            >
              My Courses
            </li>

            <li onClick={() => navigate("/educator/create-course")}>
              Create Course
            </li>

            <li onClick={() => navigate("/educator/students")}>Students</li>
            <li onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* TOPBAR */}
          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaBell />
              <FaUserCircle size={26} />
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="content">

            <h2 className="section-title">Active</h2>

            <div className="course-grid">
              {activeCourses.map(course => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/educator/course-editor/${course.id}`)}
                >
                  <img
                    src={course.image}
                    className="course-image"
                    alt={course.title}
                  />

                  <div className="course-body">
                    <div className="course-title">{course.title}</div>

                    <div className="instructor-row">
                      <span>{course.instructor}</span>
                      <span className="badge progress-badge">
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="section-title">Previous</h2>

            <div className="course-grid">
              {previousCourses.map(course => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/educator/course-editor/${course.id}`)}
                >
                  <img
                    src={course.image}
                    className="course-image"
                    alt={course.title}
                  />

                  <div className="course-body">
                    <div className="course-title">{course.title}</div>

                    <div className="instructor-row">
                      <span>{course.instructor}</span>
                      <span className="badge completed-badge">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
