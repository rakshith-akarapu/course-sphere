import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const MyCourses = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
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
          background: #f6f7fb;
          min-height: 100vh;
        }

        /* SIDEBAR */

        .sidebar {
          width: 240px;
          background: white;
          padding: 30px 20px;
          border-right: 1px solid #eee;
        }

        .sidebar h2 {
          color: #6c63ff;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .sidebar li {
          list-style: none;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.25s ease;
        }

        .sidebar li:hover {
          background: #f1f1ff;
          transform: translateX(4px);
        }

        .sidebar li.active {
          background: linear-gradient(90deg,#6c63ff,#8b7cff);
          color: white;
          box-shadow: 0 8px 18px rgba(108,99,255,0.3);
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* UPDATED NAVBAR (same as Code 2) */

        .topbar {
          background: white;
         
  padding: 10px 30px;   
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: #f4f6ff;
          padding: 10px 16px;
          border-radius: 30px;
          width: 260px;
          gap: 10px;
          transition: 0.25s ease;
        }

        .search-container:focus-within {
          background: #fff;
          box-shadow: 0 0 0 2px rgba(108,99,255,0.15);
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
          gap: 20px;
        }

        .profile-icon {
          cursor: pointer;
          color: #555;
          transition: 0.25s ease;
        }

        .profile-icon:hover {
          color: #6c63ff;
          transform: scale(1.1);
        }

        .logout-btn {
          border: none;
          padding: 8px 18px;
          border-radius: 999px;
          background: linear-gradient(90deg,#6c63ff,#8b7cff);
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(108,99,255,0.25);
        }

        /* CONTENT */

        .content {
          padding: 40px 60px 60px 60px;
        }

        .section-title {
          font-size: 22px;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(3, 320px);
          gap: 40px;
          margin-bottom: 70px;
        }

        .course-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          transition: 0.3s ease;
          cursor: pointer;
        }

        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px rgba(0,0,0,0.08);
        }

        .course-image {
          width: 100%;
          height: 190px;
          object-fit: cover;
        }

        .course-body {
          padding: 20px;
        }

        .course-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .instructor-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .badge {
          padding: 6px 14px;
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

          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaUserCircle
                size={26}
                className="profile-icon"
                onClick={goToSettings}
              />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="content">

            <div className="section-title">Active</div>

            <div className="course-grid">
              {activeCourses.map(course => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/educator/course-editor/${course.id}`)}
                >
                  <img src={course.image} className="course-image" alt={course.title}/>
                  <div className="course-body">
                    <div className="course-title">{course.title}</div>
                    <div className="instructor-row">
                      <span>{course.instructor}</span>
                      <span className="badge progress-badge">In Progress</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-title">Previous</div>

            <div className="course-grid">
              {previousCourses.map(course => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/educator/course-editor/${course.id}`)}
                >
                  <img src={course.image} className="course-image" alt={course.title}/>
                  <div className="course-body">
                    <div className="course-title">{course.title}</div>
                    <div className="instructor-row">
                      <span>{course.instructor}</span>
                      <span className="badge completed-badge">Completed</span>
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